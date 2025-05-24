import { useStore } from "@/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { languages, themes } from "@/option"
import { cn } from "@/lib/utils"
import { RxMagicWand } from "react-icons/rx";



export const LanguageSelect = ()=>{
    const language = useStore((state)=>state.language)
    const autoDetectLanguage = useStore((state)=> state.autoDetectLanguage)

    const handleChange = (language)=>{
        if(language === 'auto-detect'){
            useStore.setState({autoDetectLanguage:true ,language:'plaintext'})
        }else{
            useStore.setState({autoDetectLanguage:false ,language})

        }

    }

    

    return (
        <div>
            <label className="block text-xs mb-2 font-medium text-neutral-400">Language</label>
            <Select value={language} onValueChange = {handleChange}>
                <SelectTrigger className="w-40">
                    {autoDetectLanguage && <RxMagicWand className="mr-2"/>}
                    <SelectValue palceholder = "Select Language"/>
                </SelectTrigger>
                <SelectContent className='dark max-h-[400px]'>
                    <SelectItem value="auto-detect">Auto Detect</SelectItem>
                    {Object.entries(languages).map(([lang ,name])=>(
                        <SelectItem key={lang} value={lang}>
                            {name}
                            

                        </SelectItem>
                    ))}

                </SelectContent>
            
                
            </Select>
        </div>
    )

}