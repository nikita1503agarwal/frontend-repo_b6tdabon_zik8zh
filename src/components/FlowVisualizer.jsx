import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FlowStep from './FlowStep'

const initialSteps = [
  {
    key: 'check-running',
    title: 'Is there already a billing process running?',
    question: 'If yes, we stop to avoid duplicates.',
  },
  {
    key: 'start-flow',
    title: 'Start billing and create a unique flow ID',
    question: 'Only if nothing is running already.',
  },
  {
    key: 'step-1',
    title: 'STEP 1: Did I already create the bill?',
    question: 'If no, create the bill and mark it as DONE.',
  },
  {
    key: 'step-2',
    title: 'STEP 2: Did I already create the PDF?',
    question: 'If no, create the PDF and mark it as DONE.',
  },
  {
    key: 'step-3',
    title: 'STEP 3: Did I already upload/save the PDF?',
    question: 'If no, upload the PDF and mark it as DONE.',
  },
  {
    key: 'step-4',
    title: 'STEP 4: Did I already send the email/SMS?',
    question: 'If no, send the email and mark it as DONE.',
  },
  {
    key: 'step-5',
    title: 'STEP 5: Did I already update billing status in database?',
    question: 'If no, update database and mark it as DONE.',
  },
]

function FlowVisualizer() {
  const [states, setStates] = useState({})
  const [running, setRunning] = useState(false)
  const [flowId, setFlowId] = useState(null)

  const stepsWithState = useMemo(() => {
    return initialSteps.map((s, i) => ({
      ...s,
      index: i + 1,
      state: states[s.key] || 'idle',
    }))
  }, [states])

  const reset = () => {
    setStates({})
    setRunning(false)
    setFlowId(null)
  }

  const runSequential = async () => {
    if (running) return
    setRunning(true)

    // 1) Check if already running
    await mark('check-running', 'running')
    await wait(800)
    const alreadyRunning = false // demo assumption
    if (alreadyRunning) {
      await mark('check-running', 'done')
      setRunning(false)
      return
    }
    await mark('check-running', 'done')

    // 2) Start flow and id
    await mark('start-flow', 'running')
    await wait(500)
    const id = crypto.randomUUID()
    setFlowId(id)
    await mark('start-flow', 'done')

    // 3..7) Steps
    const ordered = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5']
    for (const step of ordered) {
      const already = Math.random() < 0.3 // randomize skip
      await mark(step, 'running')
      await wait(700)
      if (already) {
        // skip to next
        await wait(300)
        await mark(step, 'done')
      } else {
        await wait(400)
        await mark(step, 'done')
      }
    }

    setRunning(false)
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const mark = async (key, state) => setStates((p) => ({ ...p, [key]: state }))

  const skip = (key) => setStates((p) => ({ ...p, [key]: 'done' }))
  const runOne = async (key) => {
    if (states[key] === 'done') return
    setStates((p) => ({ ...p, [key]: 'running' }))
    await wait(500)
    setStates((p) => ({ ...p, [key]: 'done' }))
  }

  return (
    <section className="relative py-10 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Flow Steps</h2>
            <p className="text-slate-300/80 mt-1">
              Follow the decision tree from START to FINISH. Actions animate as they run.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={runSequential}
              disabled={running}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50"
            >
              {running ? 'Running…' : 'Run Full Flow'}
            </button>
            <button
              onClick={reset}
              disabled={running}
              className="px-4 py-2 rounded-lg border border-slate-600/60 text-slate-200 hover:bg-slate-700/40 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stepsWithState.map((s) => (
            <FlowStep
              key={s.key}
              index={s.index}
              title={s.title}
              question={s.question}
              state={s.state}
              onSkip={() => skip(s.key)}
              onRun={() => runOne(s.key)}
            />
          ))}
        </div>

        <div className="mt-8 text-slate-300/80 text-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4"
          >
            <p>
              START → check running → {"{"}yes: STOP{`}`}{' '}|{' '}
              {"{"}no: start + flow ID{`}`}. Then Step 1 → 5, skipping already-done tasks. Finally: FINISH.
            </p>
            {flowId && (
              <p className="mt-2 text-emerald-300">
                Current Flow ID: <span className="font-mono">{flowId}</span>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FlowVisualizer
