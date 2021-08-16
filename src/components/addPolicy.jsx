import React, {useEffect, useState} from 'react'
import { store } from '../firebaseconf'
import { useHistory } from 'react-router-dom'

const AddPolicy = () => {
    const hist = useHistory()

    const [policyN, setPolicyN] = useState('')
    const [broker, setBroker] = useState('')
    const [insuranceCompany, setInsuranceCompany] = useState('')
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [origin, setOrigin] = useState('')
    const [bank, setBank] = useState('')
    const [years, setYears] = useState(1)
    const [vin, setVin] = useState('')
    const [order, setOrder] = useState('')
    const [receipt, setReceipt] = useState('')
    const [salesman, setSalesman] = useState('')
    const [finalPrice, setFinalPrice] = useState('')
    const [expenditures, setExpenditures] = useState('')
    const [initialDate, setInitialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')
    const [paymentLimitDate, setPaymentLimitDate] = useState('')

    const tax = .16

    const savePolicy = async (e) => {
        e.preventDefault()
        console.log(policyN)
        const policy = {
            policyN: policyN,
            broker: broker,
            insuranceCompany: insuranceCompany,
            name: name,
            origin: origin,
            bank: bank,
            years: years,
            vin: vin,
            order: order,
            receipt: receipt,
            salesman: salesman,
            finalPrice: finalPrice,
            expenditures: expenditures,
            initialDate: initialDate,
            finalDate: finalDate,
            paymentLimitDate: paymentLimitDate,
            date: new Date,
        }
        try{
            const data = await store.collection('policies').add(policy)
            hist.push('/monitor')
        } catch(e){
            alert(e)
        }

    }
    
    return (
        <div>
            <section className='title'>
                <h2>CAPTURA DE POLIZAS</h2>
            </section>
            <form onSubmit={savePolicy} className='add-policy-form'>
                <div>
                    <p>Numero de póliza</p>
                    <input 
                        type="text"
                        value={policyN}
                        onChange={ e => {setPolicyN(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Broker</p>
                    <input
                        type="text"
                        value={broker}
                        onChange={ e => {setBroker(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Compañía</p>
                    <input 
                        type="text" 
                        value={insuranceCompany}
                        onChange={ e => {setInsuranceCompany(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Nombre</p>
                    <input 
                        type="text"
                        value={name}
                        onChange={ e => {setName(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Origen</p>
                    <input
                        type="text" 
                        value={origin}
                        onChange={ e => {setOrigin(e.target.value)}}
                    />
                </div>
                <div>
                    <p>Financiera</p>
                    <input 
                        type="text"
                        value={bank}
                        onChange={ e => {setBank(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>VIN</p>
                    <input 
                        type="text" 
                        value={vin}
                        onChange={ e => {setVin(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Pedido</p>
                    <input 
                        type="text" 
                        value={order}
                        onChange={ e => {setOrder(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Plazo</p>
                    <input 
                        type="text" 
                        value={years}
                        onChange={ e => {setYears(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Recibo</p>
                    <input 
                        type="text" 
                        value={receipt}
                        onChange={ e => {setReceipt(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Asesor</p>
                    <input 
                        type="text"
                        value={salesman}
                        onChange={ e => {setSalesman(e.target.value)}} 
                    />
                </div>
                <div className="formdiv">
                    <p>Prima Total</p>
                    <input 
                        type="text"
                        value={finalPrice}
                        onChange={ e => {setFinalPrice(e.target.value)}}    
                    />
                </div>
                <div className="formdiv">
                    <p>Gastos de emisión</p>
                    <input 
                        type="text"
                        value={expenditures}
                        onChange={ e => {setExpenditures(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Fecha de inicio</p>
                    <input 
                        type="text" 
                        value={initialDate}
                        onChange={ e => {setInitialDate(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Fecha final</p>
                    <input 
                        type="text"
                        value={finalDate}
                        onChange={ e => {setFinalDate(e.target.value)}}
                    />
                </div>
                <div className="formdiv">
                    <p>Fecha de pago</p>
                    <input 
                        type="text"
                        value={paymentLimitDate}
                        onChange={ e => {setPaymentLimitDate(e.target.value)}}
                    />
                </div>
                <div></div>
                <div></div>
                <input className='submit' type="submit" value='REGISTRAR'/>
            </form>
        </div>
    )
}

export default AddPolicy


