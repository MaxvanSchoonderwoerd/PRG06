//routes
require("dotenv").config();

const express = require("express");
const { castObject, collection } = require("./models/postsModel");

const router = express.Router();

const Post = require("./models/postsModel");

function acceptIsJSon(req) {
  if (req.header("accept") === "application/json") return true;
  else return false;
}

function contentIsJSon(req) {
  if (req.header("Content-Type") === "application/json") return true;
  else return false;
}
function contentIsNotEmpty(req) {
  if (req.body.user && req.body.title && req.body.body && req.body.active) return true;
  else return false;
}

function contentIsUrlencoded(req) {
  if (req.header("Content-Type") === "application/x-www-form-urlencoded") return true;
  else return false;
}

function currentItems(total, start, limit) {
  if (!limit || !start) {
    return total;
  }
  return Math.min(total - start, limit);
}
function numberOfPages(total, start, limit) {
  if (!limit || !start) {
    return 1;
  }
  return Math.ceil(total / limit);
}

function currentPage(start, limit) {
  if (!limit || !start) {
    return 1;
  }
  return Math.floor(start / limit) + 1;
}

function firstPageItem() {
  return 1;
}

function lastPageItem(total, start, limit) {
  if (!limit || !start) {
    return total;
  }
  if (limit == 1) {
    return total;
  }
  return (numberOfPages(total, start, limit) - 1) * limit;
}
function previousPageItem(start, limit) {
  if (!limit || !start) {
    return null;
  }
  return Math.max(start - limit, firstPageItem());
}

function nextPageItem(total, start, limit) {
  if (!limit || !start) {
    return null;
  }
  return Math.min(start + limit, lastPageItem(total, start, limit));
}
function getFirstQueryString(total, start, limit) {
  let queryString = "";
  if (limit && start) {
    queryString = `?start=${firstPageItem(total, start, limit)}&limit=${limit}`;
  }
  return queryString;
}

function getLastQueryString(total, start, limit) {
  let queryString = "";
  if (limit && start) {
    queryString = `?start=${lastPageItem(total, start, limit)}&limit=${limit}`;
  }
  return queryString;
}

function getPreviousQueryString(start, limit) {
  let queryString = "";
  if (limit && start) {
    let previousStart = previousPageItem(start, limit);
    if (previousStart !== null) {
      queryString = `?start=${previousStart}&limit=${limit}`;
    }
  }
  return queryString;
}

function getNextQueryString(total, start, limit) {
  let queryString = "";
  if (limit && start) {
    let nextStart = nextPageItem(total, start, limit);
    if (nextStart !== null) {
      queryString = `?start=${nextStart}&limit=${limit}`;
    }
  }
  return queryString;
}

function itemToPageNumber(start, limit, itemNumber) {
  if (!limit || !start) {
    return 1;
  }
  return Math.ceil(itemNumber / limit);
}

function createPagination(total, start, limit) {
  let pagination = {
    currentPage: currentPage(start, limit),
    numberOfPages: numberOfPages(total, start, limit),
    currentItems: currentItems(total, start, limit),
    firstPageQueryString: getFirstQueryString(total, start, limit),
    lastPageQueryString: getLastQueryString(total, start, limit),
    previousPageQueryString: getPreviousQueryString(start, limit),
    nextPageQueryString: getNextQueryString(total, start, limit),
  };
  return pagination;
}

// collection
router
  .route("/")
  .options((req, res) => {
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
    res.header("Allow", "HEAD, GET, POST, OPTIONS");
    res.status(200).send();
  })
  .get(async (req, res) => {
    if (acceptIsJSon(req)) {
      try {
        let start = isNaN(parseInt(req.query.start)) ? undefined : parseInt(req.query.start);
        let limit = isNaN(parseInt(req.query.limit)) ? undefined : parseInt(req.query.limit);

        console.log(`start: ${start}, limit: ${limit}`);

        let posts = await Post.find()
          .skip((currentPage(start, limit) - 1) * limit)
          .limit(limit);
        let totalPosts = await Post.countDocuments();
        let pagination = createPagination(totalPosts, start, limit);
        let postsCollection = {
          items: posts,
          _links: {
            self: {
              href: `${process.env.BASE_URI}`,
            },
            collection: {
              href: `${process.env.BASE_URI}`,
            },
          },
          pagination: {
            currentPage: pagination.currentPage,
            currentItems: pagination.currentItems,
            totalPages: pagination.numberOfPages,
            totalItems: totalPosts,
            _links: {
              first: {
                href: process.env.BASE_URI + pagination.firstPageQueryString,
              },
              last: {
                href: process.env.BASE_URI + pagination.lastPageQueryString,
              },
              previous: {
                href: process.env.BASE_URI + pagination.previousPageQueryString,
              },
              next: {
                href: process.env.BASE_URI + pagination.nextPageQueryString,
              },
            },
          },
        };
        res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
        res.status(200).send(postsCollection);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    } else {
      res.status(400).send();
    }
  })
  .post(async (req, res) => {
    if ((contentIsJSon(req) || contentIsUrlencoded(req)) && contentIsNotEmpty(req)) {
      let post = Post({
        user: req.body.user,
        title: req.body.title,
        body: req.body.body,
        active: req.body.active,
      });

      try {
        await post.save();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(201).send(post);
      } catch (err) {
        console.log(err);
        res.status(500).send();
      }
    } else {
      res.status(415).send();
    }
  });

// details
router
  .route("/:id")
  .options(async (req, res) => {
    try {
      res.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
      res.header("Allow", "HEAD, GET, PUT, DELETE, OPTIONS");
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  })
  .get(async (req, res) => {
    if (acceptIsJSon(req)) {
      try {
        let post = await Post.findById(req.params.id);
        res.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
        res.header("Allow", "HEAD, GET, PUT, DELETE, OPTIONS");
        res.status(200).send(post.toJSON());
      } catch (error) {
        console.error(error);
        res.status(404).send();
      }
    } else {
      res.status(400).send();
    }
  })
  .put(async (req, res) => {
    if (contentIsNotEmpty(req) && contentIsJSon(req)) {
      try {
        let post = await Post.findByIdAndUpdate(req.params.id, { user: req.body.user, title: req.body.title, body: req.body.body, active: req.body.active });
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send(post);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
    } else {
      console.log(req);
      res.status(400).send();
    }
  })
  .delete(async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.header("Access-Control-Allow-Origin", "*");
      res.status(204).send();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  });

module.exports = router;
