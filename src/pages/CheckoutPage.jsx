import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import '../styles/checkout.css'

import HeaderSimple from '../components/HeaderSimple';

class CheckoutPage extends React.Component {
    state={
        itemList: undefined,
        promoList: undefined,
        CustomerList: ['Fadhil', 'Akira', 'Pipit', 'Ulfa', 'Lian'],
        payment: undefined,
        customer: undefined,
        promo: undefined,
        amountPaid: undefined,
    }

    handleOnChange = async (event) =>{
        const name=event.target.name;
        let value = event.target.value;
        if(name==='customer'){
            if(Array.isArray(this.state.CustomerList)){
                const addButton = document.getElementById('addCustomer')
                let isMatch=false;
                const valRegex = new RegExp(value.toLowerCase())
                isMatch = await this.state.CustomerList.some(element => {
                    if(element.toLowerCase().match(valRegex)){
                        return true
                    }
                    return false
                });
                if(!isMatch){
                    addButton.setAttribute('class','btn btn-add-customer')
                } else{
                    addButton.setAttribute('class','btn btn-add-customer disabled')
                }
            }
            if(value!==''){
                value = await value[0].toUpperCase()+value.slice(1)
            }
        }
        await this.setState({[name]: value})
        console.log(value)
    }

    render(){
        return (
            <React.Fragment>
                <HeaderSimple
                icon="delete"
                title="Checkout"
                handleOnClick={this.props.handleOnClick}/>
                <div className="container-fluid bg-checkout">
                    <div className="container limited">
                        <div className="row section-box">
                            <h5>
                                Rangkuman Pesanan
                            </h5>
                            <hr/>
                            <div className="container-fluid order-summary">
                                <div className="row">
                                    <div className="col-6 item-name">item 1</div>
                                    <div className="col-2 item-qty">x1</div>
                                    <div className="col-4 price">15.000</div>
                                </div>
                                <div className="row">
                                    <div className="col-6 item-name">item 1</div>
                                    <div className="col-2 item-qty">x1</div>
                                    <div className="col-4 price">15.000</div>
                                </div>
                                <div className="row">
                                    <hr/>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Total Harga Barang</div>
                                    <div className="col-4 price">30.000</div>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Pajak Toko(10%)</div>
                                    <div className="col-4 price">+3.000</div>
                                </div>
                                <div className="row">
                                    <hr/>
                                </div>
                                <div className="row">
                                    <div className="col-8 item-name">Total Keseluruhan</div>
                                    <div className="col-4 price">33.000</div>
                                </div>
                            </div>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Pilihan Promo
                            </h5>
                            <hr/>
                            <form className="promo-form was-validated" onSubmit={e=>e.preventDefault()}>
                                <label htmlFor="promo" className="wrap">
                                    <select name="promo" onChange={e=>this.handleOnChange(e)}>
                                        <option value="" selected disabled>Pilih Promo</option>
                                        <option value="Merdeka">Merdeka</option>
                                    </select>
                                    <span>
                                        <i className="material-icons">arrow_drop_down_circle</i>
                                    </span>
                                </label>
                            </form>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Detail Pelanggan
                            </h5>
                            <hr/>
                            <form className="customer-form" autoComplete="off" onSubmit={e=>e.preventDefault()}>
                                <input list="customer" name="customer" onChange={e=>this.handleOnChange(e)}/>
                                <datalist id="customer">
                                    {this.state.CustomerList.map(item=>(
                                        <option value={item}>{item}</option>
                                        ))}
                                </datalist>
                                <button className="btn btn-add-customer disabled" id="addCustomer">+add</button>
                            </form>
                        </div>
                        <div className="row section-box">
                            <h5>
                                Pilihan Cara Bayar
                            </h5>
                            <hr/>
                            <form className="payment-form" onSubmit={e=>e.preventDefault()}>
                                <div class="payment-choice">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="card" name="payment" value="card" class="custom-control-input" onChange={e=>this.handleOnChange(e)} disabled/>
                                        <label class="custom-control-label" for="card">Card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="cash" name="payment" value="cash" class="custom-control-input" onChange={e=>this.handleOnChange(e)}/>
                                        <label class="custom-control-label" for="cash">Cash</label><br/>
                                        {this.state.payment==='cash'?
                                        <input type="number" name="amountPaid" value={this.state.amountPaid} onChange={e=>this.handleOnChange(e)}/>
                                        :null
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="checkout-button">
                        <Link className="btn btn-back" to="/order">
                            <i className="material-icons">arrow_back_ios</i>
                            <span>Kembali</span>
                        </Link>
                        <Link className={"btn btn-checkout " + (this.state.amountPaid===undefined||this.state.amountPaid===''?'disabled':'')}>
                            <span>Selesai</span>
                            <i className="material-icons">arrow_back_ios</i>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(CheckoutPage));