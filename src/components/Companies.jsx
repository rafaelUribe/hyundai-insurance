import React, {useState, useEffect} from 'react'
import { store } from '../firebaseconf'

const Companies = () => {
    const [company, setCompany] = useState('')
    const [corporateName, setCorporateName] = useState('')
    const [daysToGo, setDaysToGo] = useState('')
    const [companies, setCompanies] = useState([])

    const getCompanies = async () => {
        try{
            const { docs } = await store.collection('companies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setCompanies(nArray)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        getCompanies()
    }, [])

    const addCompany = async () => {
        const doc = {
            name: company,
            daysToGo: daysToGo,
            corporateName: corporateName,
        }
        try{
            await store.collection('companies').add(doc)
            setCompany('')
            setCorporateName('')
            setDaysToGo('')
            alert(`La compañía ${doc.name} fue agregada`)
        } catch (e){
            alert(e)
        }
        getCompanies()
    }

    const deleteCompany = async id => {
        try{
            await store.collection('companies').doc(id).delete()
            getCompanies()
            alert('Compañía borrada')
        } catch (e){

        }
    }

    return (
        <div className='companies'>
            <div className='companies-title'>
                <h3>Compañías de seguros</h3>
            </div>
            <section className='companies-form'>
                <div className='companies-input-container'>
                    <p>Nueva compañía</p>
                    <input 
                        type="text" 
                        onChange={e => setCompany(e.target.value.toUpperCase())}
                        value={company}
                    />
                </div>
                <div className='companies-input-container'>
                    <p>Razon Social</p>
                    <input 
                        type="text" 
                        onChange={e => setCorporateName(e.target.value.toUpperCase())}
                        value={corporateName}
                    />
                </div>
                <div className='companies-input-container'>
                    <p>Días para pagar</p>
                    <input 
                        type="text" 
                        onChange={e => setDaysToGo(e.target.value.toUpperCase())}
                        value={daysToGo}
                    />
                </div>

                <button onClick={addCompany} className='save-button'>✔︎</button>
            </section>
            <section className='companies-list'>
                <h4>Compañías de seguros</h4>
                {
                    companies?
                    (
                        companies.map( item => (
                            <div key={item.id} className='companies-list-item'>
                                <p>{item.name}</p>
                                <button 
                                    className='delete-button' 
                                    value={item.id}
                                    onClick={ e => deleteCompany(e.target.value)}
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

export default Companies
