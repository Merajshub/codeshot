import { useStore } from "@/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { themes } from "@/option"
import { cn } from "@/lib/utils"

export const ThemeSelect = ()=>{
    const theme = useStore((state)=>state.theme)

    return (
        <div>
            <label className="block text-xs mb-2 font-medium text-neutral-400">Theme</label>
            <Select value={theme} onValueChange = {(theme)=>useStore.setState({ theme })}>
                <SelectTrigger className="w-40">
                    <SelectValue palceholder = "Select Theme"/>
                </SelectTrigger>
                <SelectContent className='dark'>
                    {Object.entries(themes).map(([name,theme])=>(
                        <SelectItem key={name} value={name}>
                            <div className="flex gap-2 items-center">
                            <div className={cn("h-4 w-4 rounded-full",theme.background)}/>
                                <span className="capitalize">{name}</span> 
                            </div>

                        </SelectItem>
                    ))}

                </SelectContent>
            
                
            </Select>
        </div>
    )

}