import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const Teams = () => {
    const [team, setTeam] = useState('')
    const [teams, setTeams] = useState([])

    const getTeams = async () => {
        try{
            const { docs } = await store.collection('teams').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setTeams(nArray)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getTeams()
    }, [])

    const addTeam = async () => {
        const doc = {
            team: team,
        }
        try{
            await store.collection('teams').add(doc)
            setTeam('')
            alert(`El equipo ${doc.team} fue agregado`)
        } catch (e){
            alert(e)
        }
        getTeams()
    }

    const deleteTeam = async id => {
        try{
            await store.collection('teams').doc(id).delete()
            getTeams()
            alert('Equipo borrado')
        } catch (e){

        }
    }

    return (
        <div className='teams'>
            <div className='teams-title'>
                <h3>Equipos de Ventas</h3>
            </div>
            <section className='team-form'>
                <div className='team-input-container'>
                    <p>Nuevo equipo de ventas</p>
                    <input 
                        type="text" 
                        onChange={e => setTeam(e.target.value.toUpperCase())}
                        value={team}
                    />
                    <button onClick={addTeam} className='save-button'>✔︎</button>
                </div>
            </section>
            <section className='team-list'>
                <h4>Equipos</h4>
                {
                    teams?
                    (
                        teams.map( item => (
                            <div key={item.id} className='team-list-item'>
                                <p>{item.team}</p>
                                <button 
                                    className='delete-button' 
                                    value={item.id}
                                    onClick={ e => deleteTeam(e.target.value)}
                                >            
                                </button>
                            </div>
                        ))
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </section>
        </div>
    )
}

export default Teams
