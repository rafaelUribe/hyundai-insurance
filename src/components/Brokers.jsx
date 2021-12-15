import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf' 

const Brokers = () => {
    const [companies, setCompanies] = useState([])
    const [brokerInputValue, setBrokerInputValue] = useState('')
    const [editionBroker, setEditionBroker] = useState({})
    const [inactiveCompanies, setInactiveCompanies] = useState([])
    const [activeCompanies, setActiveCompanies] = useState([])
    const [brokers , setBrokers] = useState([])
    const [editionMode, setEditionMode] = useState(false)
    const [deletingID, setDeletingID] = useState('')

    const cancel = () => {
        setEditionBroker({})
        setEditionMode(false)
        setInactiveCompanies(companies)
        setActiveCompanies([])
        setBrokerInputValue('')
    }

    const abortDeleting = () => {
        setDeletingID('')
    }
    
    const getCompanies = async () => {
        try{
            const { docs } = await store.collection('companies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setCompanies(nArray)
            setInactiveCompanies(nArray)
        } catch (e) {
            alert(e)
        }
    }

    const getBrokers = async () => {
        try{
            const { docs } = await store.collection('brokers').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setBrokers(nArray)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getBrokers()
        getCompanies()
    }, [])

    const saveNewBroker = async () => {
        const brkr = {
            name: brokerInputValue,
            companies: activeCompanies,
        }
        try{
            await store.collection('brokers').add(brkr)
            setBrokerInputValue('')
            getCompanies()
            setActiveCompanies([])
            alert(`Se guardó el broker ${brokerInputValue}`)
        } catch (e){
            alert(e)
        }
        getBrokers()
    }

    const editBroker = id => {
        let nArray = brokers.filter(item => item.id === id)
        let brkr = nArray[0]
        setBrokerInputValue(brkr.name)
        let scopeCompanies = [...companies]
        let scopeBrkrCompanies = [...brkr.companies]
        let BrkrCompaniesIds = scopeBrkrCompanies.map(i => i.id)
        let scopeInactive = []
        let scopeActive = []
        for(let c of scopeCompanies){
            BrkrCompaniesIds.includes(c.id)?
                scopeActive.push(c)
                :
                scopeInactive.push(c)
        }
        setInactiveCompanies(scopeInactive)
        setActiveCompanies(scopeActive)
        setEditionMode(true)
        setEditionBroker(brkr)  
    }

    const deleteBroker = async (id) => {
        try{
            await store.collection('brokers').doc(id).delete()
            alert(`Se eliminó el broker`)
            setDeletingID('')
        } catch (e){
            alert(e)
        }
        getBrokers()
    }

    const updateBroker = async editionBroker => {
        let id = editionBroker.id
        const brkr = {
            name: brokerInputValue,
            companies: activeCompanies,
        }
        try{
            await store.collection('brokers').doc(id).set(brkr)
            setBrokerInputValue('')
            getCompanies()
            setActiveCompanies([])
            alert(`Se actualizó el broker ${brokerInputValue}`)
        } catch (e){
            alert(e)
        }
        getBrokers()
    }

    const setAsActive = (item) => {
        setActiveCompanies([...activeCompanies, item])
        setInactiveCompanies(inactiveCompanies.filter( i => i != item))
    }

    const setAsInactive = (item) => {
        setInactiveCompanies([...inactiveCompanies, item])
        setActiveCompanies(activeCompanies.filter( i => i != item))
    }

    return (
        <div className='brokers'>
            <section className='brokers-container'>

                <section className='brokers-title'>
                    <h3>Brokers de seguros</h3>
                </section>

                <section className='brokers-form'>
                    {
                        editionMode?
                        (
                            <h4 className='brokers-form-title'>Editando Broker</h4>
                        )
                        :
                        (
                            <h4 className='brokers-form-title'>Nuevo Broker</h4>
                        )
                    }
                    <input 
                        className='new-broker-input' 
                        type="text"
                        value={brokerInputValue}
                        onChange={(e) => setBrokerInputValue(e.target.value.toUpperCase())}
                    />
                    {
                        editionMode?
                        (
                            <button 
                                className='new-broker-submit update-button' 
                                onClick={() => updateBroker(editionBroker)}
                            >
                                ACTUALIZAR
                            </button>  
                        )
                        :
                        (
                            <button 
                                className='new-broker-submit save-button' 
                                onClick={saveNewBroker}
                            >
                                GUARDAR
                            </button>

                        )
                    }
                    {
                        editionMode?
                        (
                            <button 
                                className='new-broker-submit escape-button' 
                                onClick={cancel}
                            >
                                CANCELAR
                            </button>  
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </section>

                <section className='brokers-selectors'>
                    <div className='brokers-selectors-title-container'>
                        <h4>Selecciona compañías del broker</h4>                
                    </div>

                    <div className='broker-selectors-selectors-container'>
                        <div className='inactive-companies'>
                            <h5>Inactivas</h5>
                            <div className='inactive-items'>
                                {
                                    inactiveCompanies?
                                    (
                                        inactiveCompanies.map( item => (
                                            <div 
                                                className='inactive-item'
                                                key={item.id}
                                                onClick={ e => setAsActive(item)}
                                            >
                                                {item.name}
                                            </div>
                                        ))

                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                                }
                            </div>
                        </div>
                        <div className='active-companies'>
                            <h5>Activas</h5>
                            <div className='active-items'>
                                {
                                    activeCompanies?
                                    (
                                        activeCompanies.map( item => (
                                            <div
                                                className='active-item'
                                                key={item.id}
                                                onClick={ e => setAsInactive(item)}
                                            >
                                                {item.name}
                                            </div>
                                        ))
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                                }
                            </div>
                        </div>
                    </div>


                </section>

                <section className='brokers-monitor'>
                    <div className='brokers-monitor-title'>
                        <h3>Listado de Brokers</h3>
                    </div>
                    <div className='brokers-monitor-list'>
                        <div className='brokers-monitor-list-header'>
                                <p>Broker</p><p>Editar</p><p>Borrar</p>
                        </div>
                        <div className='brokers-monitor-list-body'>
                            {
                                brokers?
                                (
                                    brokers.map( item => (
                                        <div 
                                            className='brokers-monitor-list-item'
                                            key={item.id}
                                        >
                                            <p>{item.name}</p>
                                            <button 
                                                className='edit-button'
                                                onClick={() => editBroker(item.id)}
                                            ></button>
                                            <button
                                                className='delete-button'
                                                onClick={() => setDeletingID(item.id)}
                                            ></button>
                                        </div>
                                    ))
                                )
                                :
                                (
                                    <div className='loader'>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
                {
                    deletingID ?
                    (
                        <div className='overlay'>
                        <h4>CONFIRMAR ELIMINACION</h4>
                        <button onClick={() => deleteBroker(deletingID)} className='overlay-button-delete'>BORRAR</button>
                        <button onClick={abortDeleting} className='overlay-button-abort'>CANCELAR</button>
                        </div>
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

export default Brokers
