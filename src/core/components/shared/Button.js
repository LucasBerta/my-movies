import './_button.scss';

function Button(props) {
  return (
    <button
      {...props}
      className={`
                  my-movies__button
                  ${props.icon ? 'my-movies__button--icon' : ''}
                  ${props.className || ''}
      `.replace(/( ){2,}|\n/g, ' ').trim()}
    >
      {props.children}
    </button>
  )
}

export default Button;