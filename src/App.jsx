
import { useEffect, useRef, useState } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { cn } from './lib/utils'
import { fonts, themes } from './option'
import { useStore } from './store'
import { Card, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'
import { ExportOptions } from './components/controls/ExportOptions'
import { ThemeSelect } from './components/controls/ThemeSelect'
import { LanguageSelect } from './components/controls/LanguageSelect'
import { FontSelect } from './components/controls/FontSelect'
import { FontSizeInput } from './components/controls/FontSizeInput'
import { PaddingSlider } from './components/controls/PaddingSlider'
import { BackgroundSwitch } from './components/controls/BackgroundSwitch'
import { DarkModeSwitch } from './components/controls/DarkModeSwitch'
import { Resizable } from 're-resizable'
import { WidthMeasurement } from './components/WidthMeasurment'
import { RiResetLeftLine } from "react-icons/ri";

function App() {

  const theme = useStore(state=>state.theme)
  const padding = useStore(state=>state.padding)
  const fontStyle = useStore(state=>state.fontStyle)
  const showBackground = useStore(state=>state.showBackground)
  const editorRef = useRef(null)

  const [width, setWidth] = useState('auto')
  const [showWidth, setShowWidth] = useState(false)


//copy URL
useEffect(()=>{
  const queryParams = new URLSearchParams(location.search)
  if(queryParams.size === 0) return
  const state = Object.fromEntries(queryParams)

  useStore.setState({
    ...state,
    code: state.code? atob(state.code) : "",
    autoDetectLanguage: state.autoDetectLanguage === true,
    darkMode: state.darkMode === "true",
    fontSize: Number(state.fontSize || 18),
    padding: Number(state.padding || 64),

  })
},[])


  return (
    <main className='flex justify-center items-center min-h-screen text-white bg-neutral-950 dark '>
      <link rel="stylesheet" href={themes[theme].theme} crossOrigin='anonymmous' />
      <link rel="stylesheet" href={fonts[fontStyle].src} crossOrigin='anonymmous' />
      <Resizable enable = {{left: true, right: true}}
      minWidth={padding*2 + 400}
      size={{ width }}
        onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
        onResizeStart={() => setShowWidth(true)}
        onResizeStop={() => setShowWidth(false)}
      >
      <div className = {cn('overflow-hidden mb-2 transition-all', showBackground ? themes[theme].background: 'ring ring-neutral-900')} 
      style={{padding}}
      ref={editorRef}
      >

      <CodeEditor/>
      </div>
      <WidthMeasurement showWidth={showWidth} width={width}/>
      {width!=='auto' ? <Button size="sm" onClick={() => setWidth("auto")} variant="ghost" className='flex m-auto'>
            <RiResetLeftLine/>
            Reset width
          </Button>: ""}
    
      
      </Resizable>
      <Card className='fixed bottom-2 py-6 px-8 mx-6  bg-neutral-900/90 backdrop-blur'>
         <CardContent className="flex flex-wrap gap-6 p-0">
          <ThemeSelect/>
          <LanguageSelect/>
          {/* <FontSelect/> */}
          <FontSizeInput/>
          <PaddingSlider/>
          <BackgroundSwitch/>
          <DarkModeSwitch/>
          <div className='w-px bg-neutral-800'/>
          <div className='place-self-center'>

          <ExportOptions targetRef={editorRef}/>
          </div>
         </CardContent>

      </Card>


     </main>

  )
}

export default App
