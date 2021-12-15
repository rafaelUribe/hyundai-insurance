import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const Unregistered = () => {
    const [unpaidPolicies, setUnpaidPolicies] = useState([])
    const [showingPolicies, setShowingPolicies] = useState([])
    const [searching, setSearching] = useState('')
    const [editingPolicy, setEditingPolicy] = useState(undefined)
    const [receipt, setReceipt] = useState('')
    const [receiptError, setReceiptError] = useState('')

    const today = new Date()
    const this_month = today.getMonth()
    const this_year = today.getFullYear()

    const getPolicies = async () => {
        try{
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            loadInitialShowingPolicies(nArray)
        } catch (e){
            alert(e)
        }
    }

    const loadInitialShowingPolicies = nArray => {
        let filtered = nArray.filter( item => item.collection_status == 2)
        setUnpaidPolicies(filtered)
        setShowingPolicies(filtered)
    }

    const showPolicies = str => {
        if(str.length < 3){
            setShowingPolicies(unpaidPolicies)
        } else {
            let matching_policyN = unpaidPolicies.filter(item => item.policyN.includes(str))
            let matching_salesman =  unpaidPolicies.filter(item => item.salesman.fullName.includes(str))
            let matching_customer = unpaidPolicies.filter(item => item.name.includes(str))
            let matching_broker = unpaidPolicies.filter(item => item.broker.name.includes(str))
    
            let merged = [...matching_policyN, ...matching_salesman, ...matching_customer, ...matching_broker]

            let no_duplicates = []

            const removeDuplicatesByID = arr => {
                let ids = []
                let index = 0

                for(let i of merged){
                    if(!ids.includes(i.id)){
                        ids.push(i.id)
                        no_duplicates.push(merged[index])
                    }
                    index++
                }
            }

            removeDuplicatesByID(merged)

            setShowingPolicies(no_duplicates)
        }
    }

    const setAsUnregistered = async poli => {
        const new_pol = {...poli, collection_status: 1}
        try{
            const updt = await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('La póliza ' + poli.policyN + ' regresó una etapa a pendiendes por registrar en Dalton Soft')
        } catch (e){
            alert(e)
        }
    }

    const setAsDirectPayment = async poli => {
        const new_pol = {...poli, collection_status: 5, receipt: 'DIR', paid_month: this_month, paid_year: this_year}
        try{
            const updt = await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('Se marcó la poliza ' + poli.policyN + ' como pago directo')
        } catch (e){
            alert(e)
        }
    }
    
    const setAsDealerPayment = async poli => {
        if(receipt && receipt.length < 8){
            setReceiptError('Numero de recibo no válido')
            return
        }
        setReceiptError('')
        const new_pol = {...poli, collection_status: 3, receipt: receipt}
        try{
            const updt = await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('Se marcó la poliza ' + poli.policyN + ' como pagada por el cliente en Agencia')
            setReceipt('')
            setEditingPolicy(undefined)
        } catch (e){
            alert(e)
        }
    }


    useEffect(() => {
        getPolicies()
    }, [])



    return (
        <div className='unpaid'>
            <section className='unpaid-title'>
                <h3>Polizas por pagar por el cliente</h3>
            </section>
            <section className='unpaid-search'>
                <h5>Buscar</h5>
                <input
                    type="text"
                    value={searching}
                    onChange={e => {
                        setSearching(e.target.value.toUpperCase())
                        showPolicies(e.target.value.toUpperCase())                  
                    }}
                />
            </section>
            <section className='unpaid-list'>
                <div className='unpaid-list-header'>
                    <p>
                        POLIZA
                    </p>
                    <p>
                        CLIENTE
                    </p>
                    <p>
                        PAGO
                    </p>
                    <p className='unpaid-list-header-right'>
                        REGRESA ETAPA
                    </p>
                </div>
                {
                    showingPolicies?
                    (
                        showingPolicies.map(item => (
                            <div key={item.id} className='unpaid-item'>
                                <p
                                    className='unpaid-policy-button'
                                >
                                    {item.policyN}
                                </p>
                                <p>
                                    {item.name.slice(0, 40)}
                                </p>
                                <div 
                                    className='unpaid-item-buttons'
                                >
                                    <button
                                        className='unpaid-direct'
                                        onClick={e => setAsDirectPayment(item)}
                                    >
                                        DIRECTO
                                    </button>
                                    <button
                                        className='unpaid-dealer'
                                        onClick={e => {setEditingPolicy(item)}}
                                    >
                                        EN AGENCIA
                                    </button>
                                </div>
                                <div
                                    className='unpaid-send-back'
                                >
                                    <button
                                        onClick={ e =>
                                            setAsUnregistered(item)
                                        }
                                    >
                                        ⬅︎
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </section>
            {
                editingPolicy?
                (
                    <div className='unpaid-overlay'>
                        <div className='unpaid-overlay-form'>
                            <h5>Captura el número de recibo de la póliza {editingPolicy.policyN}</h5>
                            <input 
                                type="text"
                                value={receipt}
                                onFocus={ e => setReceiptError('')}
                                onChange={ e => setReceipt(e.target.value.toUpperCase())}
                            />
                            <p>{receiptError}</p>
                            <div className='unpaid-overlay-buttons'>
                                <button
                                    className='save-button'
                                    onClick={ e => setAsDealerPayment(editingPolicy)}
                                >
                                    MARCAR COMO PAGADA
                                </button>
                                <button
                                    className='save-button unpaid-overlay-cancel'
                                    onClick={e => setEditingPolicy(undefined)}
                                >
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
        </div>
    )
}

export default Unregistered
