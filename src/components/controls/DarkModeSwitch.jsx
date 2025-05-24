import { useStore } from "@/store"
import { Switch } from "../ui/switch"

export const DarkModeSwitch = ()=>{
    const darkMode = useStore((state)=>state.darkMode)
    return (
        <div >
            <label className="block text-xs mb-2 font-medium text-neutral-400">DarkMode</label>
            <Switch 
            className="my-1.5"
            checked = {darkMode}
            onCheckedChange = {(checked)=>useStore.setState({darkMode: checked})}
            />

        </div>
    )
}