import React, { useState, useEffect} from 'react'
import axios from 'axios'
import {store} from '../firebaseconf'

const AddQuotation = () => {
    const [zipCode, setZipCode] = useState(null)
    const [city, setCity] = useState('')
    const [salesPersons, setSalesPersons] = useState([])
    const [salesPerson, setSalesPerson] = useState('')
    const [matching, setMatching] = useState([])
    const [optionSelection, setOptionSelection] = useState(false)
    const [team, setTeam] = useState('')
    const [operationType, setOperationType] = useState('')
    const [origins, setOrigins] = useState([])
    const [displayedOrigins, setDisplayedOrigins] = useState(null)
    const [origin, setOrigin] = useState('')

    const operations = ['RENOVACION', 'CONTADO', 'FINANCIAMIENTO']
    
    const getPeople = async () =>{
        try{
            const { docs } = await store.collection('salespersons').get()
            const peopleArray = docs.map( item => ({id: item.id, ...item.data()}))
            setSalesPersons(peopleArray)
        } catch (e){
            alert(e)
        }
    }

    const getOrigins = async () =>{
        try{
            const { docs } = await store.collection('origins').get()
            const originsArray = docs.map( item => ({id: item.id, ...item.data()}))
            setOrigins(originsArray)
        } catch (e){
            alert(e)
        }
    }

    useEffect(() => {
        getPeople()
        getOrigins()
    }, [])

    const options = {
        method: 'GET',
        url: `https://mexico-zip-codes.p.rapidapi.com/codigo_postal/${zipCode}`,
        headers: {
          'x-rapidapi-host': 'mexico-zip-codes.p.rapidapi.com',
          'x-rapidapi-key': 'f75a8abd0emsh50ee1b542467d02p1d5571jsnd62d89e39711'
        }
    };
      
    const saveQuotation = (e) => {
        e.preventDefault()
        alert('works')
    }

    const loadZipCode = async () => {
        try {
            const response = await axios.request(options)
            setCity(response.data.municipio)         
        } catch(e) {
            console.log(e)
        }
    }

    const loadCity = (e) => {
        e.preventDefault()
        zipCode ? loadZipCode() : alert(`Ingresa un código postal`)
    }

    const setPerson = item => {
        setSalesPerson(item.fullName.toUpperCase())
        setTeam(item.team)
        setMatching([])
    }

    const match = value => {
        setSalesPerson(value) 
        if(salesPerson === ''){
            setOptionSelection(false)
            return
        }
        const matching_items = salesPersons.filter( item => item.fullName.includes(value))
        const matching_items_sliced = matching_items.slice(0, 3)
        setMatching(matching_items_sliced)
        setOptionSelection(true)
    }
    
    const selectOpType = item => {
        const op = origins.filter( element => element.operation == item)
        setDisplayedOrigins(op)
        setOrigin('')
    }

    const selectOrType = item => {
        const or = item.origin
        setOrigin(or)
        setDisplayedOrigins(null)
    }

    const prevDefault = e => e.preventDefault()

    return (
        <div className='quotation'>
            <form className='quotation-form'>
                <div className='quotation-salesman-div'>
                    {
                        salesPersons?
                        (
                            <div>
                                <h5>Asesor</h5>
                                <input  
                                    value={salesPerson}
                                    onChange={e => match(e.target.value.toUpperCase())} 
                                    type="text" 
                                />
                            </div>
                        )
                        :
                        (
                            <div>
                                <h5>Asesor</h5>
                                <input
                                    value={salesPerson}
                                    onChange={e => setSalesPerson(e.target.value.toUpperCase())} 
                                    type="text" 
                                />
                            </div>                     
                        )
                    }
                    <div className='options-div'>
                        {
                            optionSelection?
                            (
                                matching.map( item => (
                                <div
                                    
                                    className='options-div-option' 
                                    onClick={ (e) => setPerson(item)}
                                >
                                    {item.fullName}
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
                <div className='team-div'>
                    <h5>Equipo</h5>
                    <input 
                        type="text" 
                        disabled='disabled'
                        value={team}
                    />
                </div>
                <div className='customer-div'>
                    <h5>Cliente</h5>
                    <input type="text" />
                </div>
                <div className='origin-div'>                        
                    <h5>Tipo de operación</h5>
                    <div className='operation-container'>
                        {
                            operations?
                                (
                                    operations.map(item => (
                                        <button 
                                        key={item}
                                        value={item}
                                        onClick={(e) => {
                                            prevDefault(e)
                                            selectOpType(item)
                                        }}>
                                            {item}
                                        </button>
                                    ))
                                )
                                :
                                (
                                    <span></span>
                                )
                        }
                    </div>                            
                    <div className='origin-container'>
                        <div>
                            {
                                displayedOrigins?
                                    (
                                        <h5>Selecciona origen</h5>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                            {
                                origin?
                                    (
                                        <h5>Origen de operación</h5>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                        </div>
                        <div className='origin-buttons'>
                            {
                                displayedOrigins?
                                    (                          
                                        displayedOrigins.map(item => (
                                            <button 
                                            key={item.id} 
                                            onClick={(e) => {
                                                prevDefault(e)
                                                selectOrType(item)
                                            }}
                                            >
                                                {item.origin}
                                            </button>
                                        ))
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                        </div>
                        <div className='origin-selection'>
                            {
                                origin?
                                    (
                                        <div>{origin}</div>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }
                        </div>
                    </div>
                </div>

                <section className='quotation-data'>
                    <div className='phone-div'>
                        <h5>Teléfono</h5>
                        <input type="text" />
                    </div>
                    <div className='zip-code-div'>
                        <h5>Código postal</h5>
                        <input 
                            id='zip-code' 
                            type="text" 
                            onChange={(e) => {setZipCode(e.target.value)}}/>
                        <button onClick={loadCity}>Municipio</button>
                    </div>
                    <div className='city-div'>
                        <h5>Municipio</h5>
                        <input 
                            type="text" 
                            onChange={(e) => setCity(e.target.value)} 
                            value={city}
                            />
                    </div>
                    <div className='car-div'>
                        <h5>Auto</h5>
                        <input type="text" />
                    </div>
                    <div className='model-year-div'>
                        <h5>Año</h5>
                        <input type="text" />
                    </div>
                    <div className='version-div'>
                        <h5>Version</h5>
                        <input type="text" />
                    </div>
                </section>
                <div className='commentary-div'>
                    <h5>Comentarios</h5>
                    <input type="text" />
                </div>
                
                <div className='submit-div'>
                    <button 
                        onClick={saveQuotation}
                        className='save-button'
                    >
                        GUARDAR
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuotation
