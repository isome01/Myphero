const user = ({username = '', password = '', emailId = '', siteRole = 'user', reputation = 0}) => {
  return new Object({
    username,
    password,
    emailId,
    siteRole,
    reputation: `${reputation}`
  })
}

export default user
