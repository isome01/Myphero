const userDetails = ({age = 0, birthdate = '', occupation = ''}) => ({
  age: `${age}`,
  birthdate,
  occupation
})

export default userDetails