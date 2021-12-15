import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const SalesmanAdmin = () => {
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [lastName1, setLastName1] = useState('')
    const [lastName2, setLastName2] = useState('')
    const [nickname, setNickname] = useState('')
    const [team, setTeam] = useState('')
    const [salesTeams, setSalesTeams] = useState([])
    const [hireDate, setHireDate] = useState('01/01/2000')
    const [pic, setPic] = useState('')
    const [salesPersons, setSalesPersons] = useState([])
    const [editionId, setEditionId] = useState(null)

    const getPeople = async () =>{
        try{
            const { docs } = await store.collection('salespersons').get()
            const peopleArray = docs.map( item => ({id: item.id, ...item.data()}))
            setSalesPersons(peopleArray)
        } catch (e){
            alert(e)
        }
    }
    
    useEffect(async () => {
        const getTeams = async() => {
            try{
                const { docs } = await store.collection('teams').get()
                const teamsArray = docs.map( item => ({id:item.id, ...item.data()}))
                setSalesTeams(teamsArray)
                setTeam(teamsArray[2].team)
            } catch (e){
                alert(e)
            }
        }
        getTeams()
        getPeople()
    }, [])

    const saveSalesman = async e => {
        e.preventDefault()
        const salesman = {
            name1: name1,
            name2: name2,
            lastName1: lastName1,
            lastName2: lastName2,
            nickname: nickname,
            fullName: `${lastName1} ${lastName2} ${name1} ${name2}`,
            team: team,
            hireDate: hireDate,
            pic: pic,
            salesCode: `${name1.charAt(0)}${name2.charAt(0)}${lastName1.charAt(0)}${lastName2.charAt(0)}`,
        }
        try{
            const data = await store.collection('salespersons').add(salesman)
            alert(`El registro ${salesman.fullName} fue añadido correctamente`)
            setName1('')
            setName2('')
            setLastName1('')
            setLastName2('')
            setNickname('')
            setHireDate(null)
            setPic(null)
        } catch (e) {
            alert(e)
        }
        getPeople()
    }

    const editSalesman = item => {
        setName1(item.name1)
        setName2(item.name2)
        setLastName1(item.lastName1)
        setLastName2(item.lastName2)
        setNickname(item.nickname)
        setTeam(item.team)
        setHireDate(item.hireDate)
        setPic(item.setPic || null)
        setEditionId(item.id)
    }

    const updateSalesman = async e => {
        e.preventDefault()
        const person = {
            name1: name1,
            name2: name2,
            lastName1: lastName1,
            lastName2: lastName2,
            nickname: nickname,
            team: team,
            hireDate: hireDate,
            pic: pic,
            salesCode: `${name1.charAt(0)}${name2.charAt(0)}${lastName1.charAt(0)}${lastName2.charAt(0)}`,
        }
        try{
            await store.collection('salespersons').doc(editionId).delete()
            await store.collection('salespersons').add(person)
            alert(`El registro ${lastName1} ${lastName2} ${name1} ${name2} fue actualizado correctamente`)
            setName1('')
            setName2('')
            setLastName1('')
            setLastName2('')
            setNickname('')
            setHireDate(null)
            setPic(null)
        } catch (e) {
            alert(e)
        }
        setEditionId(null)
        getPeople()
    }

    const deleteSalesman = async id => {
        try{
            await store.collection('salespersons').doc(id).delete()
            alert('registro eliminado')
        } catch (e){
            alert(e)
        }
        getPeople()
    }

    return (
        <div className='salesman-admin'>
            <section className='salesman-admin-title'>
                <h2>Administración fuerza de ventas</h2>
            </section>
            <section className='salesman-form'>
                <form onSubmit={saveSalesman}>
                    <div class='inputs'>
                        <div>
                            <p>Primer Nombre</p>
                            <input
                                value={name1}
                                type="text" 
                                placeholder='Nombre'
                                onChange={e => setName1(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <p>Segundo Nombre</p>
                            <input
                                value={name2}
                                type="text" 
                                placeholder='Nombre'
                                onChange={e => setName2(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <p>Apellido Paterno</p>
                            <input
                                value={lastName1}
                                type="text" 
                                placeholder='Apellido'
                                onChange={e => setLastName1(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <p>Apellido Materno</p>
                            <input
                                value={lastName2}
                                type="text" 
                                placeholder='Apellido'
                                onChange={e => setLastName2(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <p>Nickname</p>
                            <input
                                value={nickname}
                                type="text" 
                                placeholder='Nickname'
                                onChange={e => setNickname(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div className="">
                            <p>Equipo</p>
                            {
                                salesTeams ?
                                (
                                    <select 
                                        name="EQUIPO" 
                                        id="team-select" 
                                        required='required' 
                                        value={team}
                                        onInput={e => setTeam(e.target.value)}
                                    >
                                        {
                                            salesTeams.map( item => (
                                                <option key={item.team} value={item.team}>{item.team}</option>
                                            ))
                                        }
                                    </select>
                                )
                                :
                                (
                                    <input
                                        value={team}
                                        type="text" 
                                        placeholder='Equipo'
                                        onChange={e => setTeam(e.target.value.toUpperCase())}
                                    />
                                )
                            }
                        </div>
                        <div className="">
                            <p>Fecha de Ingreso</p>
                            <input
                                value={hireDate}
                                type="date"
                                onChange={e => setHireDate(e.target.value.trim().toUpperCase())}
                            />
                        </div>
                        <div className='profile-pic'>
                            <p>Fotografía</p>
                            <input 
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={e => setPic(e.target.value.trim().toUpperCase())}
                            />
                        </div>
                    </div>
                    <div className="salesman-buttons">
                        {
                            editionId?
                            (
                                <button onClick={updateSalesman} className='update-button'>
                                    ACTUALIZAR
                                </button>
                            )
                            :
                            (
                                <button onClick={saveSalesman} className='save-button'>
                                    GUARDAR
                                </button>
                            )
                        }
                    </div>
                </form>
            </section>
            <section className='salesman-monitor'>
                <div>
                    <h2>Listado de promotores</h2>
                </div>
                <div className='salesman-monitor-list-container'>
                    <div className='salesman-list-header'>
                        <p>Nombre</p>
                        <p className='desktop-visible'>Equipo</p>
                        <p>Editar</p>
                        <p>Borrar</p>
                    </div>
                    {
                        salesPersons ?
                        (
                            salesPersons.map( item => (
                                <div 
                                    key={item.id}
                                    className='item'
                                >
                                    <p>{item.nickname}</p>
                                    <p className='desktop-visible'
                                    >
                                        {item.team}
                                    </p>
                                    <button 
                                        className='edit-button'
                                        onClick={ id => editSalesman(item)}   
                                    >
                                    </button>
                                    <button 
                                        className='delete-button'
                                        onClick={ id => deleteSalesman(item.id)}
                                    >                                        
                                    </button>
                                </div>
                            ))
                        )
                        :
                        (
                            <div className='loader'>
                                cargando...
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default SalesmanAdmin
