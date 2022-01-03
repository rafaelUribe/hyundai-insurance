import React, {useEffect, useState} from 'react'
import { store } from '../firebaseconf'
import { useHistory } from 'react-router-dom'

const AddPolicy = () => {
    const hist = useHistory()

    const [requestedBrkrs, setRequestedBrkrs] = useState(null)

    const [brokers, setBrokers] = useState(null)
    const [broker, setBroker] = useState('')
    
    const [companies, setCompanies] = useState(null)
    const [insuranceCompany, setInsuranceCompany] = useState(null)
    
    const operations = ['RENOVACION', 'CONTADO', 'FINANCIAMIENTO']
    const [operation, setOperation] = useState(null)

    const [origins, setOrigins] = useState(null)
    const [origin, setOrigin] = useState('')
    const [displayedOrigins, setDisplayedOrigins] = useState(null)

    const banks = ['BBVA', 'CETELEM']
    const [bank, setBank] = useState(null)

    const [auto, setAuto] = useState(null)

    const cyear = new Date()
    const cy = cyear.getFullYear()

    const [carY, setCarY] = useState(cy + 1)

    const [vin, setVin] = useState('')

    const [policyN, setPolicyN] = useState('')

    const [name, setName] = useState('')

    const year_range = [1, 2, 3, 4, 5, 6]

    const [years, setYears] = useState(1)
    const [order, setOrder] = useState('')

    const [salesman, setSalesman] = useState('')
    const [salesForce, setSalesForce] = useState(null)
    const [matchingSalesForce, setMatchingSalesForce] = useState(null)

    const [finalPrice, setFinalPrice] = useState(0)
    const [expenditures, setExpenditures] = useState(0)

    const months = {
        0: 'ENERO',
        1: 'FEBRERO',
        2: 'MARZO',
        3: 'ABRIL',
        4: 'MAYO',
        5: 'JUNIO',
        6: 'JULIO',
        7: 'AGOSTO',
        8: 'SEPTIEMBRE',
        9: 'OCTUBRE',
        10: 'NOVIEMBRE',
        11: 'DICIEMBRE',
    }

    const months_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    
    const today = new Date()

    const [initialDate, setInitialDate] = useState(new Date())
    const [initialDay, setInitialDay] = useState(initialDate.getDate())
    const [initialMonth, setInitialMonth] = useState(initialDate.getMonth())
    const [initialYear, setInitialYear] = useState(initialDate.getFullYear())

    const [finalDate, setFinalDate] = useState(new Date())
    const [finalDay, setFinalDay] = useState(initialDate.getDate())
    const [finalMonth, setFinalMonth] = useState(initialDate.getMonth())
    const [finalYear, setFinalYear] = useState(initialDate.getFullYear())

    const [paymentDate, setPaymentDate] = useState(new Date())
    const [daysToPay, setDaysToPay] = useState(14)

    const setTemporarySalesman = salesman_input_value => {
        const temporarySalesman = {
            fullName: salesman_input_value,
            hireDate: '',
            lastName1: '',
            lastName2: '',
            name1: '',
            name2: '',
            nickname: '',
            pic: '',
            salesCode: '',
            team: '',
        }
        setSalesman(temporarySalesman)
    }

    const salesPeopleSearch = salesman_input_value => {
        if(salesman_input_value.length < 4){
            setMatchingSalesForce(undefined)
            return
        }
        const matching = salesForce.filter( salesman => salesman.fullName.includes(salesman_input_value))
        setMatchingSalesForce(matching)
    }

    const getSalesForce = async () => {
        try{
            const { docs } = await store.collection('salespersons').get()
            const salesPArray = docs.map( item => ({id:item.id, ...item.data()}))
            setSalesForce(salesPArray)
        } catch (e){
            alert(e)
        }
    }

    const loadPaymentDate = (initial_date, days_to_pay) => {
        initial_date.setDate(initial_date.getDate() + days_to_pay)
        setPaymentDate(initial_date)
    } 

    const setInitial = () => {
        let d = new Date()
        d.setDate(initialDay)
        d.setMonth(initialMonth)
        d.setFullYear(initialYear)
        setInitialDate(d)


        if(insuranceCompany){
            setDaysToPay(parseInt(insuranceCompany.daysToGo))
            let new_date = new Date()
            new_date.setDate(initialDay)
            new_date.setMonth(initialMonth)
            new_date.setFullYear(initialYear)
            loadPaymentDate(new_date, daysToPay)
        }
    }

    const setFinal = async () => {
        let d = new Date()
        d.setDate(finalDay)
        d.setMonth(finalMonth)
        d.setFullYear(finalYear)
        setFinalDate(d)
    }

    useEffect( () => {
        if(insuranceCompany){
            setDaysToPay(insuranceCompany.daysToGo)
        }
    }, [insuranceCompany])

    useEffect(() => {
        setInitial()
        let initial = initialYear
        let yrs = years
        setFinalYear(initial + yrs)
    }, [initialDay, initialMonth, initialYear, years, daysToPay])

    useEffect(() => {
        setFinal()
    }, [finalDay, finalMonth, finalYear, years])

    const getBrokers = async () => {
        try{
            const {docs} = await store.collection('brokers').get()
            const brks = docs.map( item => ({id:item.id, ...item.data()}))
            setRequestedBrkrs(brks)
            setBrokers(brks)
        } catch (e){
            console.log(e)
        }
    }

    const getOrigins = async() => {
        try{
            const { docs } = await store.collection('origins').get()
            const originsArray = docs.map( item => ({id:item.id, ...item.data()}))
            setOrigins(originsArray)
        } catch (e){
            alert(e)
        }
    }

    useEffect(() => {
        getBrokers()
        getOrigins()
        getSalesForce()
    }, [])


    const savePolicy = async (e) => {
        console.log(policyN)
        const policy = {
            policyN: policyN,
            broker: broker,
            insuranceCompany: insuranceCompany,
            name: name,
            operation: operation,
            origin: origin,
            bank: bank,
            years: years,
            auto: auto,
            carY: carY,
            vin: vin,
            order: order,
            salesman: salesman,
            finalPrice: finalPrice,
            expenditures: expenditures,

            initialDate: initialDate,
            initialDay: initialDay,
            initialMonth: initialMonth,
            initialYear: initialYear,

            finalDate: finalDate,
            finalDay: finalDay,
            finalMonth: finalMonth,
            finalYear: finalYear,

            paymentDate: paymentDate,

            contractDate: today,
            collection_status: 1,
        }
        try{
            await store.collection('policies').add(policy)
            hist.push('/monitor')
        } catch(e){
            alert(e)
        }

    }

    const validateAndSave = () => {
        broker && insuranceCompany && policyN && name && operation && origin && auto && vin && years && salesman && finalPrice && expenditures?
        savePolicy()
        :
        alert('Faltan datos para guardar la póliza')
    }

    const selectOpType = item => {
        const op = origins.filter( element => element.operation === item)
        setDisplayedOrigins(op)
        setOrigin(null)
    }

    const selectOrType = item => {
        const or = item.origin
        setOrigin(or)
        setDisplayedOrigins(null)
    }

    const prevDefault = e => e.preventDefault()
    
    return (
        <div className='add-policy'>
            <section className='title'>
                <h2>CAPTURA DE POLIZAS</h2>
            </section>
            <section className='add-policy-form'>
                <section className='add-policy-number-broker'>
                    <div className="add-policy-broker">
                        <p>Broker</p>
                        <div className='add-policy-broker-container'>
                            {
                                brokers?
                                (
                                    brokers.map( item => (
                                        <button 
                                            key={item.id}
                                            className='add-policy-broker-button'
                                            onClick={ e => {
                                                setBroker(item)
                                                setBrokers(null)
                                                item.companies.length == 1?
                                                    setInsuranceCompany(item.companies[0])
                                                    :
                                                    setCompanies(item.companies)
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    ))
                                )
                                :
                                (
                                    <div></div>
                                )   
                            }
                            {
                                broker?
                                (
                                    <button
                                        className='add-policy-broker-button-selected'
                                        onClick={ e => {
                                            setBroker(null)
                                            setBrokers(requestedBrkrs)
                                            setInsuranceCompany(null)
                                            setCompanies(null)
                                        }}
                                    >
                                        {broker.name}
                                    </button>
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                        </div>
                    </div>
                    <div className="add-policy-company">
                        <p>Compañía</p>
                        <div className='add-policy-company-container'>
                            {
                                companies?
                                (
                                    companies.map( item => (
                                        <button
                                            className='add-policy-company-item'
                                            key={item.id}
                                            onClick={ e => {
                                                setInsuranceCompany(item)
                                                setCompanies(null)
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    ))
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                            {
                                insuranceCompany?
                                (
                                    <button
                                        className='add-policy-company-item-selected'
                                        key={insuranceCompany.id}
                                        onClick={ e => {
                                            setBroker(null)
                                            setBrokers(requestedBrkrs)
                                            setInsuranceCompany(null)
                                            setCompanies(null)
                                        }}
                                    >
                                        {insuranceCompany.name}
                                    </button>
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                        </div>
                    </div>

                </section>
                
                <section className='add-policy-customer'>
                    <div className='add-policy-number'>
                        <p>Número de póliza</p>
                        <input 
                            type="text"
                            value={policyN}
                            onChange={ e => {setPolicyN(e.target.value.trim().toUpperCase())}}
                        />
                    </div>
                    <div className="add-policy-name">
                        <p>Cliente</p>
                        <input 
                            type="text"
                            value={name}
                            onChange={ e => {setName(e.target.value.toUpperCase())}}
                        />
                    </div>
                </section>

                <section className='add-policy-operation-type'>                   
                    <div className='add-policy-origin'>                        
                        <h5>Tipo de operación</h5>
                        <div className='add-policy-operation-container'>
                            {
                                operations?
                                    (
                                        operations.map(item => (
                                            <button 
                                                key={item}
                                                value={item}
                                                onClick={(e) => {
                                                prevDefault(e)
                                                setBank(null)
                                                selectOpType(item)
                                                setOperation(item)
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
                        <div className='add-policy-origin-container'>
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
                            <div className='add-policy-origin-buttons'>
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
                            <div className='add-policy-origin-selection'>
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
                    <div className='add-policy-bank'>
                            {
                                operation === 'FINANCIAMIENTO'?
                                (
                                    <p>Financiera</p>
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                            <div className='add-policy-bank-buttons'>
                                {
                                    operation?
                                    (
                                        operation === 'FINANCIAMIENTO' || origin === 'REN HF'?
                                        (
                                            !bank?
                                                (
                                                    banks.map( item => (
                                                        <button
                                                            key={item}
                                                            onClick={ e => setBank(item)}
                                                        >
                                                            {item}
                                                        </button>
                                                    ))
                                                )
                                                :
                                                (
                                                    <span></span>
                                                )
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                                }
                            </div>
                            <div className='add-policy-selected-bank-container'>
                                {
                                    bank?
                                    (
                                        <button 
                                            onClick={ e=> setBank(null)}
                                        >
                                            {bank}
                                        </button>

                                    )
                                    :
                                    (
                                        <span> </span>
                                    )
                                }
                            </div>
                    </div>
                </section>
                <section className='add-policy-sales-executive'>
                    <div className='add-policy-salesman'>
                        <div className="add-policy-salesman-input">
                            <p>Asesor</p>
                            <input 
                                type="text"
                                value={salesman.fullName}
                                onChange={ e => {
                                    setTemporarySalesman(e.target.value.toUpperCase())
                                    salesPeopleSearch(e.target.value.toUpperCase())
                                }} 
                            />
                        </div>
                        <div className='add-policy-salesman-search'>

                            {
                                matchingSalesForce?
                                (
                                    matchingSalesForce.map( item => (
                                        <button
                                            className='add-policy-salesman-item'
                                            key={item.id}
                                            onClick={ e=> {
                                                setSalesman(item)
                                                setMatchingSalesForce(null)
                                            }}
                                        >
                                            {item.fullName}
                                        </button>
                                    ))
                                )
                                :
                                (
                                    <span></span>         
                                )
                            }
                        </div>
                    </div>
                </section>
                <section className='add-policy-sale-details'>
                    <div className="add-policy-car">
                        <p>AUTO</p>
                        <input 
                            type="text" 
                            value={auto}
                            onChange={ e => {setAuto(e.target.value.toUpperCase())}}
                        />
                    </div>
                    <div className="add-policy-carYear">
                        <p>AÑO</p>
                        <input 
                            type="number" 
                            value={carY}
                            onChange={ e => {setCarY(e.target.value.toUpperCase())}}
                        />
                    </div>
                    <div className="add-policy-vin">
                        <p>VIN</p>
                        <input 
                            type="text" 
                            value={vin}
                            onChange={ e => {setVin(e.target.value.trim().toUpperCase())}}
                        />
                    </div>
                    <div className='add-policy-order'>
                        {
                            operation?
                            (
                                operation != 'RENOVACION' && origin != 'EXT' ?
                                (
                                    <div className="add-policy-order-container">
                                        <p>Pedido</p>
                                        <input 
                                            type="text" 
                                            value={order}
                                            onChange={ e => {setOrder(e.target.value.trim().toUpperCase())}}
                                        />
                                    </div>                                    
                                    
                                )
                                :
                                (
                                    <span></span>
                                )
                            )                           
                            :
                            (
                                <span></span>
                            )
                        }
                    </div>
                    
                </section>

                <section className='add-policy-periods-and-price'>
                    <div className='add-policy-periods'>                
                        <div className="add-policy-periods-title">
                            <p>Plazo</p>
                        </div>
                        <div className='add-policy-years-buttons-container'>
                            {
                                !years ?
                                (
                                    year_range.map(item => (
                                            <button
                                                key={item}
                                                onClick={ e => {
                                                    setYears(parseInt(item))
                                                }}
                                            >
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
                        <div className='add-policy-selected-year-container'>
                            {
                                years ?
                                (
                                    <div>
                                        <button
                                            onClick={ e => {setYears(null)}}
                                        >
                                            Cambiar plazo
                                        </button>
                                        <div className='add-policy-selected-periods'>
                                            {years} { years == 1? 'año' : 'años'}
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <span></span>
                                )
                            }
                        </div>
                    </div>
                    
                    <div className='add-policy-price'>
                        <div className="add-policy-total-price">
                            <p>Prima Total</p>
                            <input 
                                type="number"
                                value={finalPrice}
                                onChange={ e => {setFinalPrice(e.target.value.trim())}}    
                            />
                        </div>

                        <div className="add-policy-commission">
                            <p>Gastos de emisión</p>
                            <input 
                                type="number"
                                value={expenditures}
                                onChange={ e => {setExpenditures(e.target.value.trim())}}
                            />
                        </div>
                    </div>

                </section>


                <section className='add-policy-dates'>
                    {/* <div className='add-policy-today-date'>
                        <p>HOY ES</p>
                        <p>{today.getDate()}/{months[today.getMonth()]}/{today.getFullYear()}</p>
                    </div> */}
                    <div className='add-policy-initial-date'>
                        <p>Fecha inicial</p>
                        {/* <p>{initialDay}/{months[initialMonth]}/{initialYear}</p> */}
                        <div className='add-p-in-date-inputs'>
                            <input
                                value={initialDay}
                                type="number"
                                onChange={
                                    e => {
                                        if(e.target.value < 32 && e.target.value > 0){
                                            setInitialDay(e.target.value)
                                            setFinalDay(e.target.value)
                                        }
                                    }
                                }
                            />
                            <select
                                onChange={ e => {
                                        setInitialMonth(e.target.value)
                                        setFinalMonth(e.target.value)
                                    }
                                }
                            >
                                <option value={initialMonth}>
                                    {months[initialMonth]}
                                </option>
                            {
                                months_index.map( item => (
                                    <option
                                        value={item} 
                                        key={item}
                                    >
                                        {months[item]}
                                    </option>
                                ))
                            }
                            </select>
                            <select
                                onChange={
                                    e => {
                                        setInitialYear(parseInt(e.target.value))
                                    }
                                }
                            >
                                <option value={today.getFullYear()}>
                                    {today.getFullYear()}
                                </option>
                                <option value={today.getFullYear() + 1}>
                                    {today.getFullYear() + 1}
                                </option>
                            </select>
                        </div>

                    </div>
                    <div className='add-policy-final-date'>
                        <p>Fecha Final</p>
                        {/* <p>{finalDay}/{months[finalMonth]}/{finalYear}</p> */}
                        <div className='add-p-in-date-inputs'>
                            <input
                                value={finalDay}
                                type="number"
                                onChange={
                                    e => {
                                        if(e.target.value < 32 && e.target.value > 0){
                                            setFinalDay(e.target.value)
                                        }
                                    }
                                }
                            />
                            <select
                                onChange={ e => {
                                        setFinalMonth(e.target.value)
                                    }
                                }
                            >
                                <option value={finalMonth}>
                                    {months[finalMonth]}
                                </option>
                            {
                                months_index.map( item => (
                                    <option
                                        value={item} 
                                        key={item}
                                    >
                                        {months[item]}
                                    </option>
                                ))
                            }
                            </select>
                            <input 
                                type="text" 
                                value={finalYear}
                                onChange={ e => setFinalYear(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='add-policy-payment-date'>
                        <p>Fecha límite de pago</p>
                        <p>
                            {paymentDate.getDate()}/{months[paymentDate.getMonth()]}/{paymentDate.getFullYear()}
                        </p>
                    </div>
                </section>
                <button 
                    onClick={ e => {
                        validateAndSave()
                        prevDefault(e)
                    }}
                    className='add-policy-submit save-button'
                >
                    REGISTRAR
                </button>
            </section>
        </div>
    )
};

export default AddPolicy