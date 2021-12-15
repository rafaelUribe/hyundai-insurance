import React, {useState, useEffect} from 'react'
import { store } from '../firebaseconf'

const Monitor = () => {
    //1
    const [policies, setPolicies] = useState([])
    //2
    const [showingPolicies, setShowingPolicies] = useState(undefined)
    //3
    const [searchValue, setSearchValue] = useState('')
    //4
    const [editing, setEditing] = useState(undefined)
    //5
    const [editionId, setEditionId] = useState(null)
    //6
    const [deleting, setDeleting] = useState(null)

    // editing part

    //7
    const [requestedBrkrs, setRequestedBrkrs] = useState(null)

    //8
    const [brokers, setBrokers] = useState(null)
    //9
    const [broker, setBroker] = useState('')
    
    //10
    const [companies, setCompanies] = useState(null)
    //11
    const [insuranceCompany, setInsuranceCompany] = useState(null)
    
    const operations = ['RENOVACION', 'CONTADO', 'FINANCIAMIENTO']

    //12
    const [operation, setOperation] = useState(null)

    //13
    const [origins, setOrigins] = useState(null)

    //14
    const [origin, setOrigin] = useState('')

    //15
    const [displayedOrigins, setDisplayedOrigins] = useState(null)

    const banks = ['BBVA', 'CETELEM']

    //16
    const [bank, setBank] = useState(null)

    //17
    const [auto, setAuto] = useState(null)

    //18
    const [vin, setVin] = useState('')

    //19
    const [policyN, setPolicyN] = useState('')

    //20
    const [name, setName] = useState('')
    const year_range = [1, 2, 3, 4, 5, 6]

    //21
    const [years, setYears] = useState(1)

    //22
    const [order, setOrder] = useState('')

    //23
    const [salesman, setSalesman] = useState('')

    //24
    const [salesForce, setSalesForce] = useState(null)

    //25
    const [matchingSalesForce, setMatchingSalesForce] = useState(null)

    //26
    const [finalPrice, setFinalPrice] = useState(0)

    //27
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

    const month_numbers = {
        'ENERO': 0,
        'FEBRERO': 1,
        'MARZO': 2,
        'ABRIL': 3,
        'MAYO': 4,
        'JUNIO': 5,
        'JULIO': 6,
        'AGOSTO': 7,
        'SEPTIEMBRE': 8,
        'OCTUBRE': 9,
        'NOVIEMBRE': 10,
        'DICIEMBRE': 11,
    }

    const months_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    const months_array = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
    
    //28
    const [today, setToday] = useState(new Date())

    //29
    const [initialDate, setInitialDate] = useState(new Date())
    //30
    const [initialDay, setInitialDay] = useState(undefined)
    //31
    const [initialMonth, setInitialMonth] = useState(undefined)
    //32
    const [initialYear, setInitialYear] = useState(undefined)

    //33
    const [finalDate, setFinalDate] = useState(new Date())
    //34
    const [finalDay, setFinalDay] = useState(undefined)
    //35
    const [finalMonth, setFinalMonth] = useState(undefined)
    //36
    const [finalYear, setFinalYear] = useState(undefined)

    //37
    const [paymentDate, setPaymentDate] = useState(new Date())
    //38
    const [daysToPay, setDaysToPay] = useState(14)

    //39
    const [contractDate, setContractDate] = useState(undefined)

    //40
    const [collection_status, set_collection_status] = useState(undefined)

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
        const matching = salesForce.filter( item => item.fullName.includes(salesman_input_value))
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

    const tax = .16

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

    const updatePolicy = async () => {
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

            contractDate: contractDate,
            collection_status: collection_status,
        }
        try{
            const data = await store.collection('policies').doc(editionId).set(policy)
        } catch(e){
            alert(e)
        }
        setEditing(undefined)
        setEditionId(undefined)
    }

    const validateAndUpdate = () => {
        broker && insuranceCompany && policyN && name && operation && origin && auto && vin && years && salesman && finalPrice && expenditures?
        updatePolicy()
        :
        alert('Faltan datos para guardar la póliza')
    }

    const selectOpType = item => {
        const op = origins.filter( element => element.operation == item)
        setDisplayedOrigins(op)
        setOrigin(null)
    }

    const selectOrType = item => {
        const or = item.origin
        setOrigin(or)
        setDisplayedOrigins(null)
    }

    const prevDefault = e => e.preventDefault()
    

    // editing part

    // monitor part

    const getPolicies = async () => {
        try{
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setPolicies(nArray)
            setShowingPolicies(nArray)
        } catch (e){
            alert(e)
        }
    }
    
    useEffect( () => {
        getPolicies()
    }, [])

    useEffect(() => {
        if(editing){
            let pol = {...editing}
            setBroker(pol.broker)
            setInsuranceCompany(pol.insuranceCompany)
            setPolicyN(pol.policyN)
            setName(pol.name)
            setOperation(pol.operation)
            setOrigin(pol.origin)
            setBank(pol.bank)
            setSalesman(pol.salesman)
            setAuto(pol.auto)
            setVin(pol.vin)
            setOrder(pol.order)
            setYears(pol.years)
            setFinalPrice(pol.finalPrice)
            setExpenditures(pol.expenditures)

            setInitialDate(Date.parse(pol.initialDate))
            setInitialDay(pol.initialDay)
            setInitialMonth(pol.initialMonth)
            setInitialYear(pol.initialYear)

            setFinalDate(Date.parse(pol.finalDate))
            setFinalDay(pol.finalDay)
            setFinalMonth(pol.finalMonth)
            setFinalYear(pol.setFinalYear)

            setPaymentDate(Date.parse(pol.paymentDate))

            setContractDate(Date.parse(pol.contractDate))

            set_collection_status(pol.collection_status)
        }
    }, [editing])

    const editPolicy = async (id) => {
        setEditionId(id)
        try{
            const data = await store.collection('policies').doc(id).get()
            let policy = data.data()
            setEditing(policy)
        } catch (e) {
            console.log(e)
        }
    }
    
    const deletePolicy = async () => {
        try{
            await store.collection('policies').doc(deleting).delete()
            console.log(`la poliza ${deleting} fue eliminada`)
        } catch (e){
            alert(e)
        }
        setDeleting(undefined)
        setPolicies(undefined)
        setShowingPolicies(undefined)
        getPolicies()
    }

    const abortCancelation = () => {
        setDeleting(null)
    }

    const loadShowingPolicies = () => {
        if(searchValue.length < 3){
            setShowingPolicies(policies)
        } else {
            let showing_by_salesman = policies.filter( item => item.salesman.fullName.includes(searchValue))
            let showing_by_customer = policies.filter( item => item.name.includes(searchValue))
            let showing_by_policy_number = policies.filter( item => item.policyN.includes(searchValue))
            let showing_by_company = policies.filter( item => item.insuranceCompany.name.includes(searchValue))
            let showing_by_broker = policies.filter( item => item.broker.name.includes(searchValue))

            let merged = [...showing_by_salesman, ...showing_by_customer, ...showing_by_policy_number, ...showing_by_company, ...showing_by_broker]

            setShowingPolicies(merged)
        }
    }

    return (
        <div>
            {
                editing ?
                (
                    <div className='add-policy'>
                        <section className='title'>
                            <h2>EDICION</h2>
                        </section>
                        <section className='cancel-edition-button-container'>
                            <button 
                                className='major-delete-button'
                                onClick={
                                    e => {
                                        setEditing(undefined)
                                    }
                                }
                            >
                                CANCELAR EDICION
                            </button>
                        </section>
                        <section className='add-policy-form'>
                        <section className='add-policy-number-broker'>
                            <div className="add-policy-broker">
                                <p>Broker</p>
                                <div className='add-policy-broker-container'>
                                    {
                                        brokers && !broker?
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
                                        companies && !insuranceCompany?
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
                                    onChange={ e => {setAuto(e.target.toUpperCase())}}
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

                            <div className='add-policy-initial-date'>
                                <p>Fecha inicial</p>
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
                                <div>
                                    {
                                        paymentDate?
                                        (
                                            <p>
                                                {paymentDate.getDate()}/{months[paymentDate.getMonth()]}/{paymentDate.getFullYear()}
                                            </p>
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                    }
                                </div>
                            </div>
                        </section>
                        <button 
                            onClick={validateAndUpdate}
                            className='major-edit-button'
                        >
                            ACTUALIZAR
                        </button>
                    </section>
                    </div>
                )
                :
                (
                    <div className='position-relative monitor'>
                        <section className='title'>
                            <h2>MONITOR</h2>
                        </section>
                        <section className='monitor-search-bar'>
                            <p>Buscar</p>
                            <div className='monitor-search-bar-input-container'>
                                <input 
                                    type="text"
                                    value={searchValue}
                                    onChange={e => {
                                        setSearchValue(e.target.value.toUpperCase())
                                        loadShowingPolicies(searchValue.trim())
                                    }}
                                />
                            </div>
                        </section>
                        <section className='monitor-container'>
                            <div className='monitor-container-item title-bar desktop-visible'>
                                <p className='monitor-container-item-policy'>POLIZA</p>
                                <p className='monitor-container-item-name'>CLIENTE</p>
                                <p className='monitor-container-item-salesman'>ASESOR</p>
                                <div className='buttons-container'>
                                    <p>VER</p>
                                    <p>BORRAR</p>
                                </div>
                            </div>
                            {
                                showingPolicies?
                                (
                                    showingPolicies.map( item => (
                                        <div key={item.id} className='monitor-container-item'>
                                            <button 
                                                onClick={(id) => {editPolicy(item.id)}} 
                                                className='name-button mobile-visible'
                                            >
                                                {item.name}
                                            </button>
                                            <p className='monitor-container-item-policy desktop-visible'>
                                                {item.policyN}
                                            </p>
                                            <p className='monitor-container-item-name desktop-visible'>
                                                {item.name}
                                            </p>
                                            <p className='monitor-container-item-salesman desktop-visible'>
                                                {item.salesman.fullName}
                                            </p>
                                            <div className='buttons-container desktop-visible'>
                                                <button 
                                                    className='edit-button'
                                                    onClick={(id) => {editPolicy(item.id)}}
                                                ></button>
                                                <button 
                                                    className='delete-button' 
                                                    onClick={(id) => {setDeleting(item.id)}}
                                                ></button>
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
            {
                deleting ?
                (
                    <section className='overlay'>
                        <div className='overlay-box'>
                            <h4>CONFIRMAR ELIMINACION</h4>
                            <button onClick={deletePolicy} className='major-delete-button'>BORRAR</button>
                            <button onClick={abortCancelation} className='major-edit-button'>CANCELAR</button>
                        </div>
                    </section>
                )
                :
                (
                    <span></span>
                )
            }
        </div>
    )
}

export default Monitor
