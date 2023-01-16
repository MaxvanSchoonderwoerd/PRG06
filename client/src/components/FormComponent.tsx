type TFormProps = {
  handleForm: React.FormEventHandler<HTMLFormElement>;
  user: string;
  title: string;
  body: string;
  active: string;

  setUser: Function;
  setTitle: Function;
  setBody: Function;
  setActive: Function;
};

export default function FormComponent(props: TFormProps) {
  return (
    <form onSubmit={props.handleForm}>
      <h2>Create posts</h2>
      <label htmlFor="postUser">User</label>
      <input
        id="postUser"
        type="text"
        placeholder="Enter your username"
        value={props.user}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setUser(e.target.value);
        }}
      />
      <label htmlFor="postTitle">Title</label>
      <input
        id="postTitle"
        type="text"
        placeholder="Enter the title of your post"
        value={props.title}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setTitle(e.target.value);
        }}
      />
      <label htmlFor="postBody">Body</label>
      <textarea
        id="postBody"
        placeholder="Enter the body of your post"
        value={props.body}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setBody(e.target.value);
        }}
      ></textarea>
      <label style={{ display: "none" }} htmlFor="postActive">
        Active
      </label>
      <input
        style={{ display: "none" }}
        type="checkbox"
        value={"true"}
        checked
        disabled
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setActive("true");
        }}
      />
      <button>Create post</button>
    </form>
  );
}
