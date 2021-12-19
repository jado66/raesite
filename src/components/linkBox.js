export default function LinkBox(props) {
    return (
      <div className={"link-box boxShadow"}>
          <h2 contentEditable>{props.title}</h2>
          <h3 contentEditable>{props.subtitle}</h3>
          <a href = {props.link}>{props.linkText}</a>
      </div>
    )
  }