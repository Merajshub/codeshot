import { useStore } from "@/store"
import { Switch } from "../ui/switch"

export const BackgroundSwitch = ()=>{
    const showBg = useStore((state)=>state.showBackground)
    return (
        <div >
            <label className="block text-xs mb-2 font-medium text-neutral-400">Background</label>
            <Switch 
            className="my-1.5"
            checked = {showBg}
            onCheckedChange = {(checked)=>useStore.setState({showBackground: checked})}
            />

        </div>
    )
}