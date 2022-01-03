import React, {useEffect, useState} from 'react'
import { store } from '../firebaseconf'
import { useHistory } from 'react-router-dom'

const CetelemMul = () => {
    const today = new Date
    const this_year = today.getFullYear()

    const [broker, setBroker] = useState('')
    const [company, setCompany] = useState('')
    const [customer, setCustomer] = useState('')
    const [salesForce, setSalesForce] = useState('')
    const [matchingSalesForce, setMatchingSalesForce] = useState('')
    const [salesman, setSalesman] = useState('')
    const [policyN, setPolicyN] = useState('')
    const [order, setOrder] = useState('')
    const [term, setTerm] = useState('')
    const [car, setCar] = useState('')
    const [carYear, setCarYear] = useState(this_year)
    const [vin, setVin] = useState('')
    const [price, setPrice] = useState('')
    const [expenditures, setExpenditures] = useState(600)

    const this_month = today.getMonth()
    let next_month
    this_month === 11? next_month = 0: next_month = this_month + 1
    let last_month
    this_month === 0? last_month = 11: last_month = this_month - 1

    const [initialDay, setInitialDay] = useState('')
    const [initialMonth, setInitialMonth] = useState('')
    const [initialYear, setInitialYear] = useState(this_year)

    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

    const terms = [1,2,3,4,5,6]

    const getBrokers = async () => {
        try{
            const {docs} = await store.collection('cetelemBrokers').get()
            const brks = docs.map( item => ({id:item.id, ...item.data()}))
            setBroker(brks[0])
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getBrokers()
        getSalesForce()
    }, [])

    const savePolicy = async (e) => {
        const policy = {
            policyN: policyN,
            broker: broker,
            insuranceCompany: company,
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
            finalPrice: price,
            expenditures: expenditures,

            initialDate: new Date(initialYear, initialMonth, initialDay),
            initialDay: initialDay,
            initialMonth: initialMonth,
            initialYear: initialYear,

            collection_status: 5,
        }
        try{
            await store.collection('policies').add(policy)
        } catch(e){
            alert(e)
        }
    }

    const validate = () => {
        if(initialDay && initialMonth || initialMonth === 0 && initialYear && policyN && salesman && company && term && car && vin && carYear && order && price && expenditures){
            savePolicy()
            alert('Se guardó la póliza correctamente')
        } else{
            alert('Faltan datos de la póliza necesarios para guardar')
        }
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

    return(
        <div className='cetelem-mul'>
            <header>
                <h2>MULTIANUALES CETELEM</h2>
            </header>
            <section className='mul-policyN'>
                <h3>Número de póliza</h3>
                <input
                    value={policyN} 
                    type="text" 
                    onChange={ e => setPolicyN(e.target.value.toUpperCase())}
                />
            </section>
            <section className='mul-company'>
                <h3>Compañía</h3>
                {
                    company?
                    (
                        <div className='selection-box'>
                            <button 
                                className='item-selected'
                                onClick={ e => setCompany('')}                                
                            >
                                {company.name}
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className='selection-box'>
                            {
                                broker?
                                (
                                    broker.companies.map( company => 
                                        <button
                                            key={company.name}
                                            onClick={ e => setCompany(company)}
                                        >
                                            {company.name}
                                        </button>  
                                    )
                                )
                                :
                                (
                                    <div className='loader'>
        
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </section>
            <section>
                <h3>Pedido</h3>
                <input 
                    type="text"
                    value={order}
                    onChange={ e => setOrder(e.target.value.toUpperCase().slice(0,8))}
                />
            </section>
            <section>
                <h3>Asegurado</h3>
                <input
                    value={customer}
                    onChange={e => setCustomer(e.target.value.toUpperCase())}
                    type="text" 
                />
            </section>
            <section>
                <h3>Plazo</h3>
                {
                    term?
                    (
                        <div className='selection-box'>
                            <button
                                className='item-selected'
                                onClick={ e => setTerm('')}
                            >
                                {term}
                            </button>
                        </div>
                    )
                    :
                    (
                        <div className='selection-box'>
                            {
                                terms.map( term => 
                                    <button
                                        key={term}
                                        onClick={e => setTerm(term)}
                                    >
                                        {term}
                                    </button>    
                                )
                            }
                        </div>
                    )
                }
            </section>
            <section>
                <h3>Vehículo Asegurado</h3>
                <input
                    value={car}
                    type="text"
                    onChange={ e => setCar(e.target.value.toUpperCase())}
                />
                <h3>Año</h3>
                <input
                    value={carYear}
                    type="number"
                    onChange={ e => setCarYear(parseInt(e.target.value))}
                />
                <h3>Vin</h3>
                <input
                    value={vin}
                    type="text"
                    onChange={ e => setVin(e.target.value.toUpperCase())} 
                />
            </section>
            <section>
                <h3>Vendedor</h3>
                <input 
                    type="text"
                    value={salesman.fullName}
                    onChange={ e => {
                        setTemporarySalesman(e.target.value.toUpperCase())
                        salesPeopleSearch(e.target.value.toUpperCase())
                    }} 
                />
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
            <section>
                <h3>Prima Total</h3>
                <input
                    value={price}
                    type="number"
                    onChange={e => setPrice(e.target.value)}
                />
                <h3>Gastos de expedición</h3>
                <input 
                    value={expenditures}
                    type="number"
                    onChange={e => setExpenditures(e.target.value)}
                />
            </section>
            <section>
                <h3>Inicio de Vigencia</h3>
                <div>
                    <h4>DIA</h4>
                    {
                        initialDay?
                        (
                            <div className='selection-box'>
                                <button
                                    onClick={ e => setInitialDay('')}
                                    className='item-selected'
                                >
                                    {initialDay}
                                </button>
                            </div>
                        )
                        :
                        (
                            <div className='selection-box'>
                                <button
                                    onClick={e => setInitialDay(1)}
                                >
                                    1
                                </button>
                                <button
                                    onClick={e => setInitialDay(15)}
                                >
                                    15
                                </button>
                            </div>
                        )
                    }
                </div>
                <div>
                    <h4>MES</h4>
                    {
                        initialMonth || initialMonth === 0?
                        (
                            <div className='selection-box'>
                                <button
                                    className='item-selected'
                                    onClick={ e => setInitialMonth('')}
                                >   
                                    {months[initialMonth]}
                                </button>
                            </div>
                        )
                        :
                        (
                            <div className='selection-box'>
                                <button
                                    onClick={ e => setInitialMonth(this_month)}
                                >
                                    {months[this_month]}    
                                </button>
                                <button
                                    onClick={ e => setInitialMonth(next_month)}
                                >
                                    {months[next_month]}
                                </button>
                                <button
                                    onClick={ e => setInitialMonth(last_month)}
                                >
                                    {months[last_month]}
                                </button>
                            </div>
                        )
                    }
                </div>
                <div>
                    <h4>AÑO</h4>
                    {
                        initialYear?
                        (
                            <div>
                                <button
                                    className='m12-year-selected'
                                    onClick={ e => setInitialYear('')}
                                >
                                    {initialYear}
                                </button>
                            </div>
                        )
                        :
                        (
                            <div>
                                <button
                                    onClick={ e => setInitialYear(this_year)} 
                                >{this_year}</button>
                                <button
                                    onClick={ e => setInitialYear(this_year - 1)}
                                >{this_year - 1}</button>
                                <button
                                    onClick={ e => setInitialYear(this_year + 1)}
                                >{this_year + 1}</button>
                            </div>
                        )
                    }
                </div>
            </section>
            <section>
                <button
                    className='save-button'
                    onClick={ e => validate()}
                >
                    GUARDAR POLIZA
                </button>
            </section>
        </div>
    )
};

export default CetelemMul
