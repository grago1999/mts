import React, { useState, useEffect } from "react"
import "./adminGroupList.css"

interface GroupItem {
	name: string,
	count: number,
	strGroup: string[]
}

const groupItemSort = (a: GroupItem, b: GroupItem) => a.count > b.count ? -1 : 1;

function AdminGroupList() {
	const [groups, setGroups] = useState<GroupItem[]>([]);
	const [wordToMove, setWordToMove] = useState('');
	const [groupFrom, setGroupFrom] = useState({name:''});
	const [groupTo, setGroupTo] = useState({name:''});

	const getGroupList = (previousGroups: GroupItem[] = []) => {
		fetch("http://localhost:7000/answers/allanswers")
		.then(response => response.json())
		.then(newGroups => {
			if (newGroups.length !== previousGroups.length || (previousGroups.length > 0 && newGroups.length > 0 && previousGroups[0].name !== newGroups[0].name)) {
				newGroups.sort((a: GroupItem, b: GroupItem) => b.count - a.count)
				setGroups(newGroups)
			}
			setTimeout(() => getGroupList(newGroups), 5000)
		})
	}

	const updateGroups = (groups: string[][]) => {
		console.log("hi")
		fetch("http://localhost:7000/answers/updateGroups", {
            method: "POST",
            headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
            body: JSON.stringify({
                groups
            })
        })
	}

	const moveWord = (word: string, from: any, to: any) => {
		let strGroups: string[][] = []
		const newGroups = groups.map((group: GroupItem) => {
			if(group.name === to.name){
				group.count += 1; // it'll get updated next api call so just temp
				group.strGroup.push(word);
				strGroups.push(group.strGroup)
			} else if (group.name === from.name) {
				group.count -= 1;
				group.strGroup = group.strGroup.filter((ans: string) => ans !== word);
				strGroups.push(group.strGroup)
			}

			return group;
		})
		console.log(strGroups)
		updateGroups(strGroups)
		setGroups(newGroups.sort(groupItemSort));
		setWordToMove('');
		setGroupFrom({name: ''});
		setGroupTo({name: ''});
	};
	
	
	useEffect(() => getGroupList(), [])

	if (groups.length === 0) {
		return null
	}

	return (
		<>
			<div id="group-list" className="adminList">
				{groups.length > 0 && groups.map((group: GroupItem, i: number) => {
					const id = `group_${i}`

					return (
						<div id={id} key={id} className="item">
							<h3>{`${i+1} - ${group.name}`}</h3>
							<div id={`${id}_strGroup`} className="words">
								{group.strGroup.map(word => {
									return <button key={word} onClick={() => {
										setWordToMove(word);
										setGroupFrom({name: group.name});
									}}>{word}</button>
								})}
							</div>
						</div>
					)
				})}
			</div>
			<div>
				<div>Word Being Moved: {wordToMove}</div>
				<div>From Group: {groupFrom.name}</div>
				<div>To Group: {groupTo.name}</div>
				<button onClick={() => moveWord(wordToMove, groupFrom,groupTo)}> Move </button>
				{wordToMove && groups.filter(group => group.name !== groupFrom.name).map(
					group => <button key={group.name} onClick={() => setGroupTo({name: group.name})}> {group.name} </button>
				)}
			</div>
		</>
	)
}

export default AdminGroupList
