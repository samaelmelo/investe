import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [formValue, setFomValue] = useState({
    entrada: "",
    taxa: "",
    meses: 0,
    deposito: ""
  })

  const [resultado, setResultado] = useState({
    valorDoInvestimento: "",
    valorJuros: "",
    valorTotal: ""
  })


  const rendimento = (juros, valor, meses, depositoMensal ) => {
    
    juros = Number(juros.replace(",", ".")) / 100
    
    juros = Number(juros.toFixed(4))
    
    if(valor === ""){
      valor = "0"
    }

    valor = Number(valor.replace(".","").replace(",","."))
    
    meses = Number(meses)
    


    depositoMensal = Number(depositoMensal.replace(".","").replace(",","."))

    
    
    const entrada = valor
    
    console.log({juros, valor, meses, depositoMensal})
    const brl = (v) => v.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    
    for( let i = 1; i <= meses; i++){
        valor = ( valor + depositoMensal ) * juros + (valor + depositoMensal) 
    }


setResultado({
      valorDoInvestimento: brl(entrada + depositoMensal * meses),
      valorJuros: brl(valor - entrada - (depositoMensal * meses)),
      valorTotal: brl(valor)
    })

    // return ( `Valor de investimento ${brl(entrada + depositoMensal * meses)} ========== Valor de juros em ${meses}x ${brl(valor - entrada - (depositoMensal * meses))} ======== Valor total: ${brl(valor)}  `)
}


  // const handleChange = (key, e) => {

   

  //     setFomValue(obj => ({
  //       ...obj,
  //       [key]: Number(e.target.value)
  //     }))
  // }


  const reset = () => {
    setFomValue({
      entrada: 0,
      taxa: 0,
      meses: 0,
      deposito: 0
    })
    setResultado({
      valorDoInvestimento: "",
      valorJuros: "",
      valorTotal: ""
    })
  }


  const formatCurrency = (value) => {
    // Remove todos os caracteres que não sejam números ou vírgula
    let numericValue = value.replace(/\D/g, '');

    // Se o valor tiver menos de três dígitos, adicione um "0" na frente
    if (numericValue.length < 3) {
      numericValue = numericValue.padStart(3, '0');
    }

    // Formata o valor em reais
    let formattedValue = (parseInt(numericValue, 10) / 100)
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formattedValue;
  };

  const handleChange = (e) => {
      
      setFomValue({
        ...formValue,
        [e.target.id]: formatCurrency(e.target.value)
      })
  };



  return (
    <div className='wrapper'>
      <h1>Descubra o retorno financeiro de acordo com <br/> o seu tipo de investimento. </h1>
     <form>
        <div className='flex'>

          <label htmlFor="entrada">Entrada Inicial:</label>
          <input type="text" name="name"  id="entrada" value={formValue.entrada} onChange={e => handleChange(e)} placeholder='R$ 0,00'/>
        </div>
        <div className='flex'>
          <label htmlFor="taxa">Taxa de juros:</label>
          <input type="text" placeholder='%' name="name"  id="taxa" value={formValue.taxa} onChange={e => setFomValue(oldState => ({
            ...oldState,
            [e.target.id]: e.target.value
          }))}/>
          {/* <small>Por favor insira ponto no lugar da vírgula e insira a taxa sem porcentagem</small> */}
        </div>
        <div className='flex'>
          <label htmlFor="meses">Meses:</label>
          <input type="number" name="name"  id="meses" value={formValue.meses} onChange={e => {
            setFomValue({
              ...formValue,
              [e.target.id]: e.target.value
            })
          }} />
        </div>
        <div className='flex'>
          <label htmlFor="deposito">Depósito Mensal:</label>
          <input type="text" name="name"  id="deposito" value={formValue.deposito} onChange={e => handleChange(e)} placeholder='R$ 0,00'/>
        </div>

       <div className='flex'>
            <button type='button' onClick={() => {rendimento(formValue.taxa,formValue.entrada, formValue.meses, formValue.deposito)}}>Calcular</button>
           <button onClick={reset}>Reset</button>
       </div>

       

     </form>
     {
       resultado.valorDoInvestimento && (
          <div className='resultado'>
            <p>Valor do Investimento: {resultado.valorDoInvestimento}</p>
            <p>Rendimento em juros: {resultado.valorJuros}</p>
            <p>Valor total: {resultado.valorTotal}</p>
          </div>
        )
     }
    </div>
  )
}

export default App
