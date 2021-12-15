import React, { useEffect, useState} from 'react'
import { store } from '../firebaseconf'

const Origins = () => {
    const [allOrigins, setAllOrigins] = useState([])
    const [origin, setOrigin] = useState('')
    const [operation, setOperation] = useState('')

    const operations = ['RENOVACION', 'CONTADO', 'FINANCIAMIENTO']

    const getOrigins = async() => {
        try{
            const { docs } = await store.collection('origins').get()
            const originsArray = docs.map( item => ({id:item.id, ...item.data()}))
            setAllOrigins(originsArray)
        } catch (e){
            alert(e)
        }
    }

    const addOrigin = async () => {
        const doc = {
            origin: origin,
            operation: operation,
        }
        try{
            await store.collection('origins').add(doc)
            setOrigin('')
            alert(`El origen de venta ${doc.origin} fue agregado`)
        } catch (e){
            alert(e)
        }
        getOrigins()
    }

    const deleteOrigin = async id => {
        try{
            await store.collection('origins').doc(id).delete()
            getOrigins()
            alert('Origen de venta eliminado')
        } catch (e){

        }
    }

    useEffect(async () => {
        getOrigins()
    }, [])

    return (
        <div>
            <div className='origins-container'>
                <section className='origins-title'>
                    <h3>Orígenes de venta</h3>
                </section>
                <section className='origins-form'>
                    <p>Nuevo origen</p>
                    <input 
                        type="text" 
                        onChange={e => setOrigin(e.target.value.toUpperCase())}
                        value={origin}
                    />
                    <select 
                        type="text" 
                        onChange={e => setOperation(e.target.value.toUpperCase())}
                    >
                        {
                            operations.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    <button 
                        onClick={addOrigin} 
                        className='save-button'
                    >
                        ✔︎
                    </button>
                </section>
                <section className='origins-list'>
                    <h4>Orígenes</h4>
                    {
                        allOrigins?
                        (
                            allOrigins.map( item => (
                                <div key={item.id} className='origins-list-item'>
                                    <p>{item.origin}</p>
                                    <button 
                                        className='delete-button' 
                                        value={item.id}
                                        onClick={ (e) => deleteOrigin(item.id)}
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
        </div>
    )
}

export default Origins
