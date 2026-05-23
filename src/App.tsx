import { useState } from 'react'
import './App.css'
import Selector from './components/Selector'
import EscenaImpro from './components/EscenaImpro'
import escena2 from './data/scenes/escena2.json'
import escena3 from './data/scenes/escena3.json'
import escena4 from './data/scenes/escena4.json'
import escena5 from './data/scenes/escena5.json'
import escena6 from './data/scenes/escena6.json'
import escena7 from './data/scenes/escena7.json'
import escena8 from './data/scenes/escena8.json'
import escena9 from './data/scenes/escena9.json'
import escena10 from './data/scenes/escena10.json'
import escena11 from './data/scenes/escena11.json'
import escena12 from './data/scenes/escena12.json'
import escena13 from './data/scenes/escena13.json'
import escena14 from './data/scenes/escena14.json'
import escena15 from './data/scenes/escena15.json'
import escena16 from './data/scenes/escena16.json'

interface Dialogo {
  personaje: string
  texto: string
}

interface Escena {
  id: string
  titulo: string
  dialogos: Dialogo[]
}

const ESCENAS: Escena[] = [escena2, escena3, escena4, escena5, escena6, escena7, escena8, escena9, escena10, escena11, escena12, escena13, escena14, escena15, escena16]

type Fase = 'seleccion' | 'jugando' | 'fin'

function App() {
  const [escenaSeleccionada, setEscenaSeleccionada] = useState<Escena | null>(null)
  const [personajeElegido, setPersonajeElegido] = useState<string>('')
  const [indiceDialogoActual, setIndiceDialogoActual] = useState<number>(0)
  const [aciertos, setAciertos] = useState<number>(0)
  const [errores, setErrores] = useState<number>(0)
  const [fase, setFase] = useState<Fase>('seleccion')

  function avanzar(escena: Escena, indice: number) {
    if (indice >= escena.dialogos.length) {
      setFase('fin')
    } else {
      setIndiceDialogoActual(indice)
    }
  }

  if (fase === 'seleccion') {
    return (
      <Selector
        escenas={ESCENAS}
        onConfirmar={(escena, personaje) => {
          setEscenaSeleccionada(escena)
          setPersonajeElegido(personaje)
          setIndiceDialogoActual(0)
          setAciertos(0)
          setErrores(0)
          setFase('jugando')
        }}
      />
    )
  }

  if (fase === 'jugando' && escenaSeleccionada) {
    return (
      <EscenaImpro
        escena={escenaSeleccionada}
        personajeElegido={personajeElegido}
        indiceDialogoActual={indiceDialogoActual}
        onAvanzar={() => avanzar(escenaSeleccionada, indiceDialogoActual + 1)}
        onSaltarA={(indice) => avanzar(escenaSeleccionada, indice)}
        onResultado={(resultado) => {
          if (resultado === 'bueno') setAciertos(a => a + 1)
          else setErrores(e => e + 1)
          avanzar(escenaSeleccionada, indiceDialogoActual + 1)
        }}
      />
    )
  }

  if (fase === 'fin') {
    const total = aciertos + errores
    return (
      <div className="resumen">
        <p className="resumen__escena">{escenaSeleccionada?.titulo}</p>
        <h1 className="resumen__titulo">Escena completada</h1>
        <div className="resumen__stats">
          <div className="resumen__stat resumen__stat--bueno">
            <span className="resumen__num">{aciertos}</span>
            <span className="resumen__label">Aciertos</span>
          </div>
          <div className="resumen__stat resumen__stat--malo">
            <span className="resumen__num">{errores}</span>
            <span className="resumen__label">Errores</span>
          </div>
          {total > 0 && (
            <div className="resumen__stat">
              <span className="resumen__num">
                {Math.round((aciertos / total) * 100)}%
              </span>
              <span className="resumen__label">Precisión</span>
            </div>
          )}
        </div>
        <button
          className="resumen__boton"
          onClick={() => {
            setEscenaSeleccionada(null)
            setPersonajeElegido('')
            setFase('seleccion')
          }}
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return null
}

export default App
