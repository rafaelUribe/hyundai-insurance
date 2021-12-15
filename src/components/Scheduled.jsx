import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const Scheduled = () => {
    const [brokers, setBrokers] = useState([])
    const [unscheduledPolicies, setUnscheduledPolicies] = useState(undefined)
    const [showingPolicies, setShowingPolicies] = useState(undefined)
    const [searching, setSearching] = useState('')

    const today = new Date()
    const this_month = today.getMonth()
    const this_year = today.getFullYear()

    const getPolicies = async () => {
        try{
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            load(nArray)
        } catch (e){
            alert(e)
        }
    }

    const load = all_policies => {
        const filtered_policies = unscheduledFilter(all_policies)
        const sorted_policies = sortByBroker(filtered_policies)
        setUnscheduledPolicies(sorted_policies)
        setShowingPolicies(sorted_policies)
    }

    const getBrokers = async () => {
        try{
            const {docs} = await store.collection('brokers').get()
            const brks = docs.map( item => ({id:item.id, ...item.data()}))
            setBrokers(brks)
        } catch (e){
            console.log(e)
        }
    }

    const unscheduledFilter = pol => {
        return pol.filter( policy => policy.collection_status === 4)
    }

    const sortByBroker = arr => {
        let sorted = []
        for(let broker of brokers){
            let matching = arr.filter( pol => pol.broker.id === broker.id )
            sorted = [...sorted, ...matching]
        }
        return sorted
    }

    const showPolicies = str => {
        if(str.length < 3){
            setShowingPolicies(unscheduledPolicies)
        } else {
            let matching_policyN = unscheduledPolicies.filter(item => item.policyN.includes(str))
            let matching_salesman =  unscheduledPolicies.filter(item => item.salesman.fullName.includes(str))
            let matching_customer = unscheduledPolicies.filter(item => item.name.includes(str))
            let matching_broker = unscheduledPolicies.filter(item => item.broker.name.includes(str))
    
            let merged = [...matching_policyN, ...matching_salesman, ...matching_customer, ...matching_broker]

            let no_duplicates = []

            const removeDuplicatesByID = () => {
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

            const sorted = sortByBroker(no_duplicates)

            setShowingPolicies(sorted)
        }
    }

    const setAsPaid = async poli => {
        const new_pol = {...poli, collection_status: 5, paid_month: this_month, paid_year: this_year }
        try{
            await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('Se marcó como liquidada la poliza: ' + poli.policyN)
        } catch (e){
            alert(e)
        }
    }

    const setAsUnscheduled = async poli => {
        const new_pol = {...poli, collection_status: 3}
        try{
            await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            alert('La póliza ' + poli.policyN + ' regresó a polizas por programar para pago')
        } catch (e){
            alert(e)
        }
    }

    useEffect(() => {
        getBrokers()
    }, [])

    useEffect(() => {
        getPolicies()
    }, [brokers])

    return (
        <div className='forschedule'>
            <section className='forschedule-title'>
                <h3>Polizas programadas para pago sin liquidar por la agencia</h3>
            </section>
            <section className='forschedule-search'>
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
            <section className='forschedule-list'>
                <div className='forschedule-list-header'>
                    <p>
                        POLIZA
                    </p>
                    <p>
                        CLIENTE
                    </p>
                    <p>
                        BROKER
                    </p>
                    <p className='forschedule-list-header-alignc'>
                        AVANZAR A PROGRAMADAS
                    </p>
                    <p className='forschedule-list-header-alignc'>
                        REGRESA ETAPA
                    </p>
                </div>
                {
                    showingPolicies?
                    (
                        showingPolicies.map(item => (
                            <div key={item.id} className='forschedule-item'>
                                <p>
                                    {item.policyN}
                                </p>
                                <p>
                                    {item.name.slice(0, 40)}
                                </p>
                                <p>
                                    {item.broker.name}
                                </p>
                                <div 
                                    className='forschedule-item-buttons'
                                >
                                    <button
                                        className='forschedule-schedule'
                                        onClick={
                                            e => setAsPaid(item)
                                        }
                                    >
                                        LIQUIDADA
                                    </button>
                                </div>
                                <div
                                    className='forschedule-send-back'
                                >
                                    <button
                                        onClick={ e =>
                                            setAsUnscheduled(item)
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
        </div>
    )
}

export default Scheduled
