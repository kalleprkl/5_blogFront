import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(user)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log('Laita oikein!')
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        {this.state.user ?
          <Blogs blogs={this.state.blogs} /> :
          <Login
            onSubmit={this.login}
            handleLoginFieldChange={this.handleLoginFieldChange}
            usernameValue={this.state.username}
            passwordValue={this.state.password}
          />
        }
      </div>
    );
  }
}

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )
}

const Login = ({ usernameValue, passwordValue, handleLoginFieldChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          name='username'
          value={usernameValue}
          onChange={handleLoginFieldChange}
        />
      </div>
      <div>
        <input
          name='password'
          value={passwordValue}
          onChange={handleLoginFieldChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default App;
