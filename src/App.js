import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'

const App = () => {
  const [name, setName] = useState([])
  const [email, setEmail] = useState([])
  const [phone, setPhone] = useState([])
  const [users, setUsers] = useState([])
  const [nameId, setNameId] = useState('')

  useEffect(() => {
    const getName = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const getN = await res.json()
      setName(await getN)
    }
    getName()
  }, [])

  const handleName = (e) => {
    const getNameId = e.target.value
    setNameId(getNameId)
  }

  useEffect(() => {
    const getEmail = async () => {
      const resEmail = await fetch(`https://jsonplaceholder.typicode.com/users/${nameId}`)
      const getE = await resEmail.json()
      setEmail(await getE)
    }
    getEmail()
  }, [])

  useEffect(() => {
    const getPhone = async () => {
      const resPhone = await fetch(`https://jsonplaceholder.typicode.com/users/${nameId}`)
      const getP = await resPhone.json()
      setPhone(await getP)
    }
    getPhone()
  }, [])

  const handleSubmit = async () => {
    try {
      const resData = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: name,
        email: email,
        phone: phone,
      })
      console.log(resData.data)
    } catch (err) {
      alert('something went wrong in post method')
    }
  }

  const getAllUsers = async () => {
    try {
      const users = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(users.data)
    } catch (err) {
      alert('something is wrong in get method')
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Container>
      <div className='row mb-5'>
        <div className="col-sm-12">
          <h1>Select Dropdown {nameId}</h1>
          <div className="row-mb-3">
            <div className="form-group col-md-4">
              <label className='mb-2'>Name</label>
              <select name="name" className='form-control' onChange={e => handleName(e)}>
                <option>--Select Name--</option>
                {name.map((value) => (
                  <option key={value.id} value={value.id}>{value.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label className='mb-2'>Email</label>
              <select name="name" className='form-control'>
                <option>--Select Email--</option>
                {email.map((value) => (
                  <option key={value.id}>{value.email}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-4">
              <label className='mb-2'>Email</label>
              <select name="name" className='form-control'>
                <option>--Select Phone--</option>
                {phone.map((value) => (
                  <option key={value.id}>{value.phone}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-2 mt-4">
              <button className="btn btn-success mt-2" onClick={e => handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default App
