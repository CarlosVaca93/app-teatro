import { useState, useRef } from 'react'

interface Dialogo {
  personaje: string
  texto: string
}

interface Escena {
  id: string
  titulo: string
  dialogos: Dialogo[]
}

interface Props {
  escenas: Escena[]
  onConfirmar: (escena: Escena, personaje: string) => void
}

export default function Selector({ escenas, onConfirmar }: Props) {
  const [escenaSeleccionada, setEscenaSeleccionada] = useState<Escena | null>(null)
  const [personajeElegido, setPersonajeElegido] = useState<string>('')
  const personajesRef = useRef<HTMLElement>(null)

  const personajesUnicos: string[] = escenaSeleccionada
    ? [...new Set(escenaSeleccionada.dialogos.map((d) => d.personaje))]
    : []

  function handleConfirmar() {
    if (escenaSeleccionada && personajeElegido) {
      onConfirmar(escenaSeleccionada, personajeElegido)
    }
  }

  return (
    <div className="selector">
      <h1 className="selector__titulo">ASSASSINAT A L’ORIENT EXPRESS</h1>
      <section className="selector__bloque">
        <h2 className="selector__label">Elige una escena</h2>
        <ul className="selector__lista">
          {escenas.map((escena) => (
            <li key={escena.id}>
              <button
                className={`selector__opcion ${escenaSeleccionada?.id === escena.id ? 'selector__opcion--activa' : ''}`}
                onClick={() => {
                  setEscenaSeleccionada(escena)
                  setPersonajeElegido('')
                  setTimeout(() => personajesRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
                }}
              >
                {escena.titulo}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {escenaSeleccionada && (
        <section className="selector__bloque" ref={personajesRef}>
          <h2 className="selector__label">Elige tu personaje</h2>
          <ul className="selector__lista">
            {personajesUnicos.map((personaje) => (
              <li key={personaje}>
                <button
                  className={`selector__opcion ${personajeElegido === personaje ? 'selector__opcion--activa' : ''}`}
                  onClick={() => setPersonajeElegido(personaje)}
                >
                  {personaje.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {personajeElegido && (
        <button className="selector__confirmar" onClick={handleConfirmar}>
          Comenzar como {personajeElegido.toUpperCase()}
        </button>
      )}
      <footer className="selector__footer">
        ADAPTACIÓ I DIRECCIÓ ELENA OLIVER ||
        Desarrollado por: <a href="https://carlosvaca.dev" target="_blank" rel="noopener noreferrer">carlosvaca.dev</a>
      </footer>
    </div>
  )
}
