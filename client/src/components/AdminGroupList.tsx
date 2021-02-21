import { group } from "console"
import React, { useState, useEffect } from "react"
import "./adminGroupList.css"

interface GroupItem {
	name: string,
	count: number,
	words: string[]
}

const groupItemSort = (a: GroupItem, b: GroupItem) => a.count > b.count ? -1 : 1;

function AdminGroupList() {
	const [groups, setGroups] = useState<GroupItem[]>([]);
	const [wordToMove, setWordToMove] = useState('');
	const [groupFrom, setGroupFrom] = useState({name:''});
	const [groupTo, setGroupTo] = useState({name:''});

	const getGroupList = () => {
		fetch("http://localhost:7000/answers/allanswers")
		.then(response => response.json())
		.then(groups => {
			groups = groups.map((g: any) => Object.assign({}, g, { words: [] }))
			return setGroups(groups.sort((a: GroupItem, b: GroupItem) => a.count > b.count ? 1 : -1))
		})
	}

	const moveWord = (word: string, from: any, to: any) => {
		const newGroups = groups.map((group: GroupItem) => {
			if(group.name === to.name){
				group.count += 1; //TODO: Find the actual count of the word
				group.words.push(word);
			} else if(group.name === from.name) {
					group.count -= 1;
					group.words = group.words.filter((ans: string) => ans !== word);
			}

			return group;
		})
		setGroups(newGroups.sort(groupItemSort));
		setWordToMove('');
		setGroupFrom({name: ''});
		setGroupTo({name: ''});
	};
	
	
	useEffect(() => {
		if (groups.length === 0) {
			getGroupList()
		}
	}, [])

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
							<div id={`${id}_words`} className="words">
								{group.words.map(word => {
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
