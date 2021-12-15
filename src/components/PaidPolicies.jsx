import React, { useState, useEffect } from 'react'
import { store } from '../firebaseconf'

const PaidPolicies = () => {
    const [policies, setPolicies] = useState([])
    const [brokers, setBrokers] = useState([])

    const this_month = new Date().getMonth()
    const [month, setMonth] = useState(this_month)

    const this_year = new Date().getFullYear()
    const [year, setYear] = useState(this_year)

    const [consultPolicies, setConsultPolicies] = useState([])
    const [showingPolicies, setShowingPolicies] = useState([])
    
    const [searching, setSearching] = useState('')

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

    const months_index = [0,1,2,3,4,5,6,7,8,9,10,11]

    const getPolicies = async () => {
        console.log('policies call')
        try{
            const { docs } = await store.collection('policies').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            const paid = filterPaid(nArray)
            setPolicies(paid)
        } catch (e){
            alert(e)
        }
    }

    const getBrokers = async () => {
        console.log('brokers call')
        try{
            const { docs } = await store.collection('brokers').get()
            const nArray = docs.map( item => ({id:item.id, ...item.data()}))
            setBrokers(nArray)
        } catch (e) {
            alert(e)
        }
    }

    const sortByBroker = policies => {
        console.log('policies sorted')
        let sorted = []
        for(let broker of brokers){
            let matching = policies.filter( pol => pol.broker.id === broker.id )
            sorted = [...sorted, ...matching]
        }
        return sorted
    }

    const printPolicies = () => {
        const filtered_by_date = filterByDate(policies)
        const sorted = sortByBroker(filtered_by_date)
        setConsultPolicies(sorted)
        setShowingPolicies(sorted)
    }

    const filterPaid = policies => {
        return policies.filter( policy => policy.collection_status === 5)
    }

    const filterByDate = policies => {
        return policies.filter( policy => policy.paid_year === year)
                       .filter( policy => policy.paid_month === month)
    }

    useEffect(() => {
        getBrokers()
        getPolicies()
    }, [])

    const showPolicies = search_string => {
        if(search_string.length < 1){
            setShowingPolicies(consultPolicies)
        } else {
            let matching_policyN = consultPolicies.filter(item => item.policyN.includes(search_string))
            let matching_salesman = consultPolicies.filter(item => item.salesman.fullName.includes(search_string))
            let matching_customer = consultPolicies.filter(item => item.name.includes(search_string))
            let matching_broker = consultPolicies.filter(item => item.broker.name.includes(search_string))
    
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

    const setAsScheduled = async poli => {
        const new_pol = {...poli, collection_status: 4}
        try{
            const updt = await store.collection('policies').doc(poli.id).update(new_pol)
            getPolicies()
            setShowingPolicies([])
            alert('Regreso como programada para pago distribudor la poliza: ' + poli.policyN)
        } catch (e){
            alert(e)
        }
    }

    return (
        <div className='paid'>
            {
                brokers.length > 0 && policies.length > 0?
                (
                    <div className='paid-container'>
                        <section className='paid-title'>
                            <h3>Polizas liquidadas</h3>
                        </section>
                        <section className='paid-date'>
                            <h5>Mes de consulta</h5>
                            <select
                                onChange={
                                    e => setMonth(parseInt(e.target.value))
                                }
                            >
                                <option value={this_month}>{months[this_month]}</option>
                                {
                                    months_index.filter(index => index != this_month).map( index => (
                                        <option key={index} value={index}>{months[index]}</option>
                                    )) 
                                }
                            </select>
                            <h5>Año de consulta</h5>
                            <select 
                                onChange={
                                    e => setYear(parseInt(e.target.value))
                                }
                            >
                                <option value={this_year}>{this_year}</option>
                                <option value={this_year - 1}>{this_year - 1}</option>
                                <option value={this_year - 2}>{this_year - 2}</option>
                            </select>
                            {/* <p>{months[month]} {year}</p> */}
                        </section>
                        <section className='paid-date-search-button'>
                                <button
                                    className='major-edit-button'
                                    onClick={ e => printPolicies()}
                                >
                                    Consultar
                                </button>
                        </section>
                        <section className='paid-search'>
                            <p>Buscar póliza</p>
                            <input
                                value={searching}                                   
                                type="text"
                                onChange={
                                    e => {
                                        showPolicies(e.target.value.toUpperCase())
                                        setSearching(e.target.value.toUpperCase())
                                    }
                                } 
                            />
                        </section>
                        <section className='paid-list'>
                            <div className='paid-list-head'>
                                <p>Poliza</p>
                                <p>Cliente</p>
                                <p>Regresar Etapa</p>
                            </div>
                            {
                                showingPolicies?
                                (
                                    showingPolicies.map( poli => (
                                        <div 
                                            key={poli.id}
                                            className='paid-list-item'
                                        >
                                            <p>{poli.policyN}</p>
                                            <p>{poli.name}</p>
                                            <button
                                                className='paid-list-back-button'
                                                onClick={ e => setAsScheduled(poli)}
                                            >
                                                ⬅︎
                                            </button>
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
                :
                (
                    <div className='paid-loader'>
                        <p>
                            Cargando...
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default PaidPolicies