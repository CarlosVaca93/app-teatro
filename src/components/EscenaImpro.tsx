import { useState, type SyntheticEvent } from 'react'

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
  escena: Escena
  personajeElegido: string
  indiceDialogoActual: number
  onAvanzar: () => void
  onSaltarA: (indice: number) => void
  onResultado: (resultado: 'bueno' | 'malo') => void
}

export default function EscenaImpro({
  escena,
  personajeElegido,
  indiceDialogoActual,
  onAvanzar,
  onSaltarA,
  onResultado,
}: Props) {
  const [textoUsuario, setTextoUsuario] = useState('')
  const [lineaEnviada, setLineaEnviada] = useState('')
  const [verificando, setVerificando] = useState(false)
  const [pistaVisible, setPistaVisible] = useState(false)

  const dialogo = escena.dialogos[indiceDialogoActual]
  const esTurnoUsuario = dialogo.personaje === personajeElegido

  const proximaLineaUsuario = escena.dialogos.findIndex(
    (d, i) => i > indiceDialogoActual && d.personaje === personajeElegido
  )
  const destinoSalto = proximaLineaUsuario !== -1
    ? Math.max(indiceDialogoActual + 1, proximaLineaUsuario - 3)
    : -1
  const puedesSaltar = destinoSalto > indiceDialogoActual + 1

  const primerDosPalabras = dialogo.texto.split(/\s+/).slice(0, 2).join(' ')

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (textoUsuario.trim()) {
      setLineaEnviada(textoUsuario.trim())
      setTextoUsuario('')
      setVerificando(false)
      setPistaVisible(false)
      setVerificando(true)
    }
  }

  function handleResultado(resultado: 'bueno' | 'malo') {
    setLineaEnviada('')
    setVerificando(false)
    setPistaVisible(false)
    onResultado(resultado)
  }

  if (verificando) {
    return (
      <div className="escena">
        <h2 className="escena__titulo">{escena.titulo}</h2>

        <p className="escena__personaje">{dialogo.personaje.toUpperCase()}</p>

        <div className="comparativa">
          <div className="comparativa__columna">
            <h3 className="comparativa__label">Guion</h3>
            <p className="comparativa__texto">{dialogo.texto}</p>
          </div>
          <div className="comparativa__columna">
            <h3 className="comparativa__label">Tu versión</h3>
            <p className="comparativa__texto">{lineaEnviada}</p>
          </div>
        </div>

        <div className="comparativa__acciones">
          <button
            className="escena__boton escena__boton--bueno"
            onClick={() => handleResultado('bueno')}
          >
            Bueno
          </button>
          <button
            className="escena__boton escena__boton--malo"
            onClick={() => handleResultado('malo')}
          >
            Malo
          </button>
        </div>

        <p className="escena__progreso">
          {indiceDialogoActual + 1} / {escena.dialogos.length}
        </p>
      </div>
    )
  }

  return (
    <div className="escena">
      <h2 className="escena__titulo">{escena.titulo}</h2>

      <div className="escena__dialogo">
        <p className="escena__personaje">{dialogo.personaje.toUpperCase()}</p>

        {esTurnoUsuario ? (
          <form className="escena__form" onSubmit={handleSubmit}>
            <textarea
              className="escena__input"
              value={textoUsuario}
              onChange={(e) => setTextoUsuario(e.target.value)}
              placeholder="Escribe tu línea..."
              rows={4}
              autoFocus
            />
            <div className="escena__acciones">
              <button
                className="escena__boton"
                type="submit"
                disabled={!textoUsuario.trim()}
              >
                Enviar
              </button>
              <button
                className="escena__boton escena__boton--pista"
                type="button"
                onClick={() => setPistaVisible(true)}
                disabled={pistaVisible}
              >
                Pista
              </button>
            </div>
            {pistaVisible && (
              <p className="escena__pista">«{primerDosPalabras}…»</p>
            )}
          </form>
        ) : (
          <>
            <p className="escena__texto">{dialogo.texto}</p>
            <div className="escena__acciones">
              <button className="escena__boton" onClick={onAvanzar}>
                Siguiente
              </button>
              {puedesSaltar && (
                <button
                  className="escena__boton escena__boton--saltar"
                  onClick={() => onSaltarA(destinoSalto)}
                >
                  Saltar al contexto
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <p className="escena__progreso">
        {indiceDialogoActual + 1} / {escena.dialogos.length}
      </p>
    </div>
  )
}
