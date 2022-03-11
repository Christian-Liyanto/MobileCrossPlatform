import React, {useState} from "react";
import FriendsContext, {Friend} from "./friend-context";

const FriendsContextProvider: React.FC = props => {
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 'f1',
            name: 'John Thor',
            photo: 'https://asset.kompas.com/crops/SV5q4gPkeD8YJTuzO31BqTr9DEI=/192x128:1728x1152/750x500/data/photo/2021/03/06/60436a28b258b.jpg'
        }
    ]);

    const addFriend = (name: string, photo: string) => {
        const newFriend: Friend = {
            id: Math.random().toString(),
            name: name,
            photo: 'https://indihome.co.id/uploads/images/blog/9-Hal-Penting-yang-Harus_21725210708093619_D.jpg'
        };
        
        setFriends((currFriends) => {
            return currFriends.concat(newFriend);
        });
    };
    const updateFriend = (id: string, name:string, photo:string) => {
        const newFriend: Friend = {
            id: id,
            name: name,
            photo: photo
        };
        
        var idx = 0;
        var exist = false;
        friends.forEach(friend => {
            if(friend.id === id){
                exist = true;
            }
            else{
                if(exist == false){
                    idx++;
                }
            }
        });
        friends.splice(idx, 1, newFriend);

    };
    const deleteFriend = (id: string) => {
        setFriends(friends.filter(friend => friend.id != id));
    };

    return(
        <FriendsContext.Provider value={{
            friends,
            addFriend,
            updateFriend,
            deleteFriend
        }}>
            {props.children}
        </FriendsContext.Provider>
    );
};

export default FriendsContextProvider;