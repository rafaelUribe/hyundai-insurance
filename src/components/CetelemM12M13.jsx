import React, {useState, useEffect} from 'react'
import { store } from '../firebaseconf'

const CetelemM12M13 = () => {
    const [m12, setm12] = useState('')
    const [m13, setm13] = useState('')
    const [brokers, setBrokers] = useState('')
    const [broker, setBroker] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('')
    const [order, setOrder] = useState('')

    const [customer, setCustomer] = useState('')

    const [salesman, setSalesman] = useState('')
    const [salesForce, setSalesForce] = useState(null)
    const [matchingSalesForce, setMatchingSalesForce] = useState(null)

    const cyear = new Date()
    const cy = cyear.getFullYear()

    const [car, setCar] = useState('')
    const [carYear, setCarYear] = useState(cy + 1)
    const [vin, setVin] = useState('')

    const [term, setTerm] = useState('')

    const [finalPriceM12, setFinalPriceM12] = useState('')
    const [finalPriceM13, setFinalPriceM13] = useState('')
    const [expenditures, setExpenditures] = useState(600)

    const today = new Date()
    const this_month = today.getMonth()
    const this_year = today.getFullYear()
    const last_month = this_month - 1
    const next_month = this_month + 1

    const [m12Day, setM12Day] = useState('')
    const [m12Month, setM12Month] = useState('')
    const [m12Year, setM12Year] = useState('')

    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

    const getBrokers = async () => {
        try{
            const {docs} = await store.collection('cetelemBrokers').get()
            const brks = docs.map( item => ({id:item.id, ...item.data()}))
            setBrokers(brks)
            setBroker(brks[0])
        } catch (e){
            console.log(e)
        }
    }

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

    const getSalesForce = async () => {
        try{
            const { docs } = await store.collection('salespersons').get()
            const salesPArray = docs.map( item => ({id:item.id, ...item.data()}))
            setSalesForce(salesPArray)
        } catch (e){
            alert(e)
        }
    }

    const salesPeopleSearch = salesman_input_value => {
        if(salesman_input_value.length < 4){
            setMatchingSalesForce(undefined)
            return
        }
        const matching = salesForce.filter( salesman => salesman.fullName.includes(salesman_input_value))
        setMatchingSalesForce(matching)
    }

    useEffect(() => {
        getBrokers()
        getSalesForce()
        console.log('hoy:', today, 'este mes', this_month)
    }, [])

    const savePolicy = async (e) => {
        const m12policy = {
            policyN: m12,
            broker: broker,
            insuranceCompany: selectedCompany,
            name: customer,
            operation: 'FINANCIAMIENTO',
            origin: 'HF',
            bank: 'CETELEM',
            years: 1,
            auto: car,
            vin: vin,
            carYear: carYear,
            receipt: 'DIR',
            order: order,
            salesman: salesman,
            finalPrice: finalPriceM12,
            expenditures: expenditures,

            initialDate: new Date(m12Year, m12Month, m12Day),
            initialDay: m12Day,
            initialMonth: m12Month,
            initialYear: m12Year,

            collection_status: 5,
        }
        const m13policy = {
            policyN: m13,
            broker: broker,
            insuranceCompany: selectedCompany,
            name: customer,
            operation: 'FINANCIAMIENTO',
            origin: 'MUL',
            bank: 'CETELEM',
            years: term,
            auto: car,
            vin: vin,
            carYear: carYear,
            receipt: 'DIR',
            order: order,
            salesman: salesman,
            finalPrice: finalPriceM13,
            expenditures: expenditures,

            initialDate: new Date(m12Year + 1, m12Month, m12Day),
            initialDay: m12Day,
            initialMonth: m12Month,
            initialYear: m12Year,

            collection_status: 5,
        }
        try{
            await store.collection('policies').add(m12policy)
            await store.collection('policies').add(m13policy)
        } catch(e){
            alert(e)
        }
    }

    const validate = () => {
        if(m12Day && m12Month && m12Year && m12 && m13 && salesman && selectedCompany && term && car && vin && carYear && order && finalPriceM12 && finalPriceM13 && expenditures){
            savePolicy()
        } else{
            alert('Faltan datos de la póliza necesarios para guardar')
        }
    }

    return (
        <div className='cetelem-m12'>
            <section className='cetelem-m12-title'>
                <h3>M12 Y M13</h3>
            </section>
            <section className='cetelem-m12-policy-numbers'>
                <div>
                    <p>
                        POLIZA M12
                    </p>
                    <input
                        value={m12}
                        type="text"
                        onChange={ e => setm12(e.target.value.toUpperCase())} 
                    />
                </div>
                <div>
                    <p>
                        POLIZA M13
                    </p>
                    <input
                        value={m13} 
                        type="text"
                        onChange={ e => setm13(e.target.value.toUpperCase())} 
                    />
                </div>
            </section>
            <section className='cetelem-m12-price'>
                <div>
                    <p>
                        PRIMA TOTAL M12
                    </p>
                    <input
                        value={finalPriceM12 || 0}
                        onChange={ e => setFinalPriceM12(parseInt(e.target.value))}
                        type="text"
                    />
                </div>
                <div>
                    <p>
                        PRIMA TOTAL M13
                    </p>
                    <input
                        value={finalPriceM13 || 0}
                        onChange={ e => setFinalPriceM13(parseInt(e.target.value))}
                        type="text"
                    />
                </div>
                <div>
                    <p>
                        GASTOS DE EXPEDICION
                    </p>
                    <input
                        value={expenditures || 0}
                        onChange={ e => setExpenditures(parseInt(e.target.value))}
                        type="text" 
                    />
                </div>
            </section>
            <section className='cetelem-m12-broker-company-selection'>
                <div className='cetelem-m12-broker-selection'>
                    {
                        brokers?
                        (
                            <div className='cetelem-m12-broker-selection-box'>
                                {
                                    brokers.map( broker => (
                                        <div key={broker.id}>
                                            {broker.name}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        :   
                        (
                            <div className='loader'>
                                Cargando...
                            </div>
                        )
                    }
                </div>
                <div className='cetelem-m12-company-selection'>
                    {
                        !selectedCompany && broker?
                        (
                            broker.companies.map( company => (
                                <button
                                    key={company.id}
                                    className='m12-company'
                                    onClick={ e => setSelectedCompany(company)}
                                >
                                    {company.name}
                                </button>
                            ))
                        )
                        :
                        (
                            <button 
                                className='m12-company-selected'
                                onClick={ e => setSelectedCompany('')}    
                            >
                                {selectedCompany.name}
                            </button>
                        )
                    }
                </div>
            </section>
            <section className='cetelem-m12-order'>
                <div>
                    <p>Pedido</p>
                    <input 
                        type="text"
                        value={order}
                        onChange={ e => setOrder(e.target.value.toUpperCase().slice(0,8))}
                    />
                </div>
            </section>
            <section className='cetelem-m12-customer'>
                <p>
                    Nombre del cliente                    
                </p>
                <input 
                    type="text" 
                    onChange={ e => setCustomer(e.target.value)}
                />
            </section>
            <section className='cetelem-m12-salesman'>
                <div className="cetelem-m12-salesman-input">
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
                <div className='cetelem-m12-salesman-search'>
                    {
                        matchingSalesForce?
                        (
                            matchingSalesForce.map( item => (
                                <button
                                    className='cetelem-m12-salesman-item'
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
            </section>
            <section className='cetelem-m12-car'>
                <div className='cetelem-m12-car-name'>
                    <p>Auto</p>
                    <input
                        value={car}
                        onChange={e => setCar(e.target.value.toUpperCase())} 
                        type="text" 
                    />
                </div>
                <div className='cetelem-m12-car-year'>
                    <p>Año</p>
                    <input
                        value={carYear}
                        onChange={e => setCarYear(e.target.value)}
                        type="number" 
                    />
                </div>
                <div className='cetelem-m12-car-vin'>
                    <p>VIN</p>
                    <input
                        value={vin}
                        onChange={e => setVin(e.target.value.toUpperCase().slice(0,17))} 
                        type="text" 
                    />
                    {
                        vin.length < 17?
                        (
                            <p className='vin-alert'>El vin es muy corto</p>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </div>
            </section>
            <section className='cetelem-m13-term'>
                <div className='cetelem-m13-term-title'>
                    <p>Plazo M13</p>
                </div>
                {
                    term?
                    (
                        <div className='cetelem-m13-term-selected'>
                            <button
                                onClick={ e => setTerm('')}
                            >
                                {term}
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className='cetelem-m13-term-container'>
                            <button
                                onClick={ e => setTerm(1)}
                            >
                                1
                            </button>

                            <button
                                onClick={ e => setTerm(2)}
                            >
                                2
                            </button>

                            <button
                                onClick={ e => setTerm(3)}
                            >
                                3
                            </button>

                            <button
                                onClick={ e => setTerm(4)}
                            >
                                4
                            </button>

                            <button
                                onClick={ e => setTerm(5)}
                            >
                                5
                            </button>

                            <button
                                onClick={ e => setTerm(6)}
                            >
                                6
                            </button>
                        </div>
                    )
                }
            </section>
            <section className='m12-date'>
                <div className='m12-date-container'>
                    <p>Fecha de inicio M12</p>                       
                    <div className='m12-day-buttons'>
                        <p>DIA</p>
                        <div>
                            {
                                m12Day?
                                (
                                    <div
                                      
                                    >
                                        <button
                                            className='m12-day-selected'
                                            onClick={e => setM12Day('')}
                                        >
                                            {m12Day}
                                        </button>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <button
                                            onClick={e => setM12Day(1)}
                                        >1</button>
                                        <button
                                            onClick={e => setM12Day(15)}
                                        >15</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='m12-month-buttons'>
                        <p>MES</p>
                        {
                            m12Month || m12Month === 0 ?
                            (
                                <div>
                                    <button
                                        className='m12-month-selected'
                                        onClick={ e => setM12Month('')}
                                    >
                                        {months[m12Month]}
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <button
                                        onClick={ e => setM12Month(last_month)}
                                    >{months[last_month]}</button>
                                    <button
                                        onClick={ e => setM12Month(this_month)}
                                    >{months[this_month]}</button>
                                    <button
                                        onClick={ e => next_month === 12? setM12Month(0) : setM12Month(next_month)}
                                    >{months[next_month] || months[0]}</button>
                                </div>
                            )
                        }
                    </div>
                    <div className='m12-year-buttons'>
                        <p>AÑO</p>
                        {
                            m12Year?
                            (
                                <div>
                                    <button
                                        className='m12-year-selected'
                                        onClick={ e => setM12Year('')}
                                    >
                                        {m12Year}
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <button
                                        onClick={ e => setM12Year(this_year)} 
                                    >{this_year}</button>
                                    <button
                                        onClick={ e => setM12Year(this_year - 1)}
                                    >{this_year - 1}</button>
                                    <button
                                        onClick={ e => setM12Year(this_year + 1)}
                                    >{this_year + 1}</button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='m13-date-container'>
                    <p>Vigencia M13</p>
                    {
                        m12Day && m12Year && term?
                        (
                            <div className='m13-date'>
                                <p>DEL</p>
                                <p className='m13-i'>{m12Day}/{months[m12Month]}/{m12Year + 1}</p>
                                <p>AL</p>
                                <p className='m13-i'>    {m12Day}/{months[m12Month]}/{m12Year + 1 + term}</p>
                            </div>
                        )
                        :
                        (
                            <div className='m13-date-alert'>
                                <h5>
                                    Error
                                </h5>
                                <p>
                                    Seleccione la fecha de inicio de m12 y plazo
                                </p>
                            </div>
                        )
                    }
                </div>
            </section>
            <section 
                className='m12-calls'
            >
                <button 
                    className='save-button'
                    onClick={e => validate()}
                >
                    GUARDAR POLIZAS
                </button>
            </section>
        </div>
    )
}

export default CetelemM12M13
