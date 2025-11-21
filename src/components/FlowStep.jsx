import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

function StatusIcon({ state }) {
  if (state === 'done') return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  if (state === 'running') return <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
  return <Circle className="w-5 h-5 text-slate-400" />
}

function FlowStep({ index, title, question, state, onSkip, onRun }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="group bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-5 md:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700/70 text-slate-200 text-sm font-semibold">
          {index}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <StatusIcon state={state} />
            <h3 className="text-white font-semibold text-base md:text-lg">{title}</h3>
          </div>
          {question && (
            <p className="mt-1.5 text-slate-300/80 text-sm">{question}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={onSkip}
              disabled={state !== 'idle'}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-slate-600/60 text-slate-200 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip
            </button>
            <button
              onClick={onRun}
              disabled={state !== 'idle'}
              className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Run
            </button>
            <AnimatePresence>
              {state === 'done' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-2 text-emerald-400/90 text-xs"
                >
                  Marked as DONE
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FlowStep
