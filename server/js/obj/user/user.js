import userDetails from './userDetails'

const user = ({username = '', password = '', emailId = '', siteRole = 'user', reputation = 0}) => {

  return new Object({
    username: username.toLocaleLowerCase(),
    password,
    emailId: emailId.toLocaleLowerCase(),
    siteRole: siteRole.toLocaleLowerCase(),
    reputation: `${reputation}`,
    userDetails: userDetails({})
  })
}

export default user
