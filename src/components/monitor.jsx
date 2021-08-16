import React, {useState, useEffect} from 'react'
import { store } from '../firebaseconf'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Monitor = () => {
    const hist = useHistory()
    const [policies, setPolicies] = useState([])

    useEffect(() => {
        const getPolicies = async() => {
          const { docs } = await store.collection('policies').get()
          const nArray = docs.map( item => ({id:item.id, ...item.data()}))
          setPolicies(nArray)
        }
        getPolicies()
    }, [])

    const editPolicy = async (id) => {
        try{
            const data = await store.collection('policies').doc(id).get()
            const p =  data.data()
            await store.collection('edition').add(p)
            hist.push('/policy')
        } catch (e) {
            console.log(e)
        }
    }
    
    const deletePolicy = async id => {
        try{
            await store.collection('policies').doc(id).delete()
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setPolicies(nArray)
        } catch (e){
            alert(e)
        }
    }

    return (
        <div>
            <section className='title'>
                <h2>MONITOR</h2>
            </section>
            <section className='monitor-container'>
                <div className='monitor-container-item title-bar'>
                    <p className='monitor-container-item-policy'>POLIZA</p>
                    <p className='monitor-container-item-name'>CLIENTE</p>
                    <p className='monitor-container-item-salesman'>ASESOR</p>
                    <p></p>
                </div>
                {
                    policies.length !== 0?
                    (
                        policies.map( item => (
                            <div key={item.id} className='monitor-container-item'>
                                <button className='name-button'>
                                    {`${item.name}`}
                                </button>
                                <p className='monitor-container-item-policy'>
                                    {item.policyN}
                                </p>
                                <p className='monitor-container-item-name'>
                                    {item.name}
                                </p>
                                <p className='monitor-container-item-salesman'>
                                    {item.salesman}
                                </p>
                                <div className='buttons-container'>
                                    <button className='edit-button' onClick={(id) => {editPolicy(item.id)}}></button>
                                    <button className='delete-button' onClick={(id) => {deletePolicy(item.id)}}></button>
                                </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <div className='loader'></div>
                    )
                }
            </section>
        </div>
    )
}

export default Monitor
