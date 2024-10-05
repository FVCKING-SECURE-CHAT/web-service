'use client'

import { Search, SendHorizonal, SendIcon, ShareIcon } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatId } from "@/redux/reducers/chatsReducer";

export default function Home() {
  const dispatch = useDispatch();

  const chats = useSelector((state: any) => state.chats)

  const handleSelectedChatIdChange = async (id: string) => {
    dispatch(setSelectedChatId(id))

    console.log(id);
  }

  return (
    <div className="flex w-full flex-row">

      <div className="flex flex-col w-80 max-w-80 h-screen max-h-screen">
        <div className="flex flex-row gap-4 items-center justify-center w-full h-20 border-b px-4">
          <Input className="w-full border" />
          <Search className="text-zinc-800 opacity-70" />
        </div>

        <div className="flex flex-col w-80 max-w-80 h-[calc(100vh-5rem)] overflow-y-auto overflow-x-clip">
          {
            Array.from({ length: 20 }).map((item, index) => {
              return (
                <div key={index} onClick={() => handleSelectedChatIdChange(index.toString())} className="w-full flex p-4 items-center hover:cursor-pointer hover:bg-zinc-100  flex-row gap-4 border-b border-b-zinc-400/20">
                  <img className="w-10 h-10 min-h-10 min-w-10 aspect-square rounded-full" src={'https://picsum.photos/200'} alt="" />
                  <div className="flex flex-col gap-1">
                    <h1 className="truncate">Jhon Doe</h1>
                    <p className="text-xs w-48 opacity-40 truncate">Last seen at 9pm at yesterday qweqw qweqw eqweqw eqweqweqweqweqw </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="relative w-full h-screen border-x">
        <div className="flex flex-row absolute bottom-0 items-center gap-4 border-t w-full p-3">
          <Textarea placeholder="Hello how are you ?" className=" h-full max-h-full resize-none" />
          <Button className="flex items-center justify-center h-fit w-fit p-3">
            <SendIcon size={23} />
          </Button>
        </div>
      </div>
      <div className="w-52 min-w-52 h-screen">3</div>
    </div>
  );
}
