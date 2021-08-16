import React, { useEffect, useState} from 'react'
import { store } from '../firebaseconf'

const Policy = () => {
    const [id, setId] = useState('')
    const [policyInEdition, setPolicyInEdition] = useState(null)

    const [policyN, setPolicyN] = useState('')
    const [broker, setBroker] = useState('')
    const [insuranceCompany, setInsuranceCompany] = useState('')
    const [name, setName] = useState('')
    const [origin, setOrigin] = useState('')
    const [bank, setBank] = useState('')
    const [years, setYears] = useState('')
    const [vin, setVin] = useState('')
    const [order, setOrder] = useState('')
    const [receipt, setReceipt] = useState('')
    const [salesman, setSalesman] = useState('')
    const [finalPrice, setFinalPrice] = useState('')
    const [expenditures, setExpenditures] = useState('')
    const [initialDate, setInitialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')
    const [paymentLimitDate, setPaymentLimitDate] = useState('')
    
    useEffect(() => {
        // const getPolicy = async () => {
        //     try{
        //         const { docs } = await store.collection('edition').get()
        //         const nArray = docs.map( item => ({id:item.id, ...item.data()}))
        //         setPolicyInEdition(nArray[0])
        //         setValues()
        //     } catch (e) {
        //         alert(e)
        //     }       
        // }
        // getPolicy()
    }, [])

    const setValues = async () => {
        // setPolicyN(policyInEdition.policyN)
        // setBroker(policyInEdition.broker)
        // setInsuranceCompany(policyInEdition.insuranceCompany)
        // setName(policyInEdition.name)
        // setOrigin(policyInEdition.origin)
        // setBank(policyInEdition.bank)
        // setYears(policyInEdition.years)
        // setVin(policyInEdition.vin)
        // setOrder(policyInEdition.order)
        // setReceipt(policyInEdition.receipt)
        // setSalesman(policyInEdition.salesman)
        // setFinalPrice(policyInEdition.finalPrice)
        // setExpenditures(policyInEdition.expenditures)
        // setInitialDate(policyInEdition.initialDate)
        // setFinalDate(policyInEdition.finalDate)
        // setPaymentLimitDate(policyInEdition.paymentLimitDate)
        // setId(policyInEdition.id)
    
        // setPolicyInEdition(null)

        // await store.collection('edition').doc(id).delete()
    }
    

    const updatePolicy = () => {

    }

    return (
        <div>
            <section className='title'>
                <h2>CONSULTA DE POLIZA</h2>
            </section>
            <form onSubmit={updatePolicy} className='add-policy-form'>
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
                <input className='submit' type="submit" value='ACTUALIZAR'/>
            </form>
        </div>
    )
}

export default Policy
