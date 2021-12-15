import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const Unregistered = () => {
    const [policies, setPolicies] = useState([])
    const [unregisteredPolicies, setUnregisteredPolicies] = useState([])
    const [showingPolicies, setShowingPolicies] = useState([])
    const [searching, setSearching] = useState('')
    const [policyToRegister, setPolicyToRegister] = useState(undefined)

    const getPolicies = async () => {
        try{
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setPolicies(nArray)
            loadInitialShowingPolicies(nArray)
        } catch (e){
            alert(e)
        }
    }

    const loadInitialShowingPolicies = nArray => {
        let filtered = nArray.filter( item => item.collection_status == 1)
        setUnregisteredPolicies(filtered)
        setShowingPolicies(filtered)
    }

    const showPolicies = str => {
        if(str.length < 3){
            setShowingPolicies(unregisteredPolicies)
        } else {
            let matching_policyN = unregisteredPolicies.filter(item => item.policyN.includes(str))
            let matching_salesman =  unregisteredPolicies.filter(item => item.salesman.fullName.includes(str))
            let matching_customer = unregisteredPolicies.filter(item => item.name.includes(str))
            let matching_broker = unregisteredPolicies.filter(item => item.broker.name.includes(str))
    
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

    const setAsRegistered = async poli => {
        const new_pol = {...poli, collection_status: 2}
        try{
            const updt = await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('Se marcó como registrada en Dalton Soft la poliza ' + poli.policyN)
        } catch (e){
            alert(e)
        }
    }

    useEffect(() => {
        getPolicies()
    }, [])



    return (
        <div className='unregistered'>
            <section className='unregistered-title'>
                <h3>Polizas por registrar en Dalton Soft</h3>
            </section>
            <section className='unregistered-search'>
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
            <section className='unregistered-list'>
                <div className='unregistered-list-header'>
                    <p>
                        POLIZA
                    </p>
                    <p>
                        CLIENTE
                    </p>
                    <p>
                        ASESOR
                    </p>
                    <p>
                        REGISTRADA
                    </p>
                </div>
                {
                    showingPolicies?
                    (
                        showingPolicies.map(policy => (
                            <div key={policy.id} className='unregistered-item'>
                                <p
                                    className='unregistered-policy-button'
                                    onClick={
                                        e=> {
                                            setPolicyToRegister(policy)
                                        }
                                    }
                                >
                                    {policy.policyN}
                                </p>
                                <p>
                                    {policy.name.slice(0, 40)}
                                </p>
                                <p>
                                    {policy.salesman.nickname}
                                </p>
                                <div 
                                    className='unregistered-item-buttons'
                                >
                                    <button
                                        onClick={ e=> {
                                            setAsRegistered(policy)
                                        }}
                                    >
                                        ➜
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
                policyToRegister?
                (
                    <div className='unregistered-overlay'>
                        <div className='unregistered-overlay-policy-container'>
                            <p className='unregistered-overlay-type-of'>
                                {
                                    policyToRegister.operation == 'RENOVACION'?
                                    (
                                        <p>POLIZA RENOVACION</p>
                                    )
                                    :
                                    (
                                        <p>POLIZA NUEVA</p>
                                    )
                                }
                            </p>
                            <p className='unregistered-overlay-policy-number'>
                               Número de póliza: {policyToRegister.policyN} 
                            </p>
                            <p>
                                {
                                    policyToRegister.broker.name == 'EIKOS'?
                                    (
                                        <p>Pedido: {policyToRegister.order}</p>
                                    )
                                    :
                                    (
                                        <p>Pedido: S/P</p>
                                    )
                                }
                            </p>
                            <p>
                                {policyToRegister.origin}
                            </p>
                            <p className='unregistered-overlay-policy-customer'> 
                                Cliente: {policyToRegister.name}
                            </p>
                            <p className='unregistered-overlay-policy-vin'>
                                Vin: {policyToRegister.vin}
                            </p>
                            <p className='unregistered-overlay-negotiation'>
                                Negociación: {policyToRegister.broker.name} - {policyToRegister.insuranceCompany.name}
                            </p>
                            <p className='unregistered-overlay-policy-salesman-code'>
                                Asesor: {policyToRegister.salesman.salesCode}
                            </p>
                            <p className='unregistered-overlay-policy-salesman-name'>
                               {policyToRegister.salesman.fullName}
                            </p>
                            <p>
                                Prima Total: {policyToRegister.finalPrice}
                            </p>
                            <p>
                                Gastos: {policyToRegister.expenditures}
                            </p>
                            <p>
                                Inicio: {policyToRegister.initialDay}/{policyToRegister.initialMonth}/{policyToRegister.initialYear}
                            </p>
                            <p>
                                Final: {policyToRegister.finalDay}/{policyToRegister.finalMonth}/{policyToRegister.finalYear}
                            </p>
                            <p className='uregistered-overlay-policy-obs'>
                                Observaciones: {policyToRegister.origin} {policyToRegister.bank}
                            </p>
                            <button 
                                className='unregistered-overlay-ok'
                                onClick={ e => setPolicyToRegister(undefined)}
                            >
                                OK
                            </button>
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
