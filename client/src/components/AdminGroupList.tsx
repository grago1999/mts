import { group } from "console"
import React, { useState, useEffect } from "react"
import "./adminGroupList.css"

interface GroupItem {
	id: string,
	mainWord: string,
	count: number,
	words: string[]
}

function AdminGroupList() {
	const [groups, setGroups] = useState<GroupItem[]>([])

	const getGroupList = () => {
		// fetch("http://localhost:1000")
		// .then(response => response.json())
		// .then(groups => setGroups(groups.sort((a: Group, b: Group) => a.count > b.count)))
		const groups: GroupItem[] = [
			{
				id: "abc1",
				mainWord: "gum",
				count: 10,
				words: ["gum1", "gum2"]
			},
			{
				id: "abc2",
				mainWord: "game",
				count: 4,
				words: ["game1", "game2"]
			},
			{
				id: "abc3",
				mainWord: "steam",
				count: 6,
				words: ["steam1", "steam2"]
			},
			{
				id: "abc4",
				mainWord: "foo",
				count: 8,
				words: ["foo1", "foo2"]
			},
			{
				id: "abc5",
				mainWord: "cactus",
				count: 1,
				words: ["cactus1", "cactus2"]
			},
			{
				id: "abc6",
				mainWord: "bar",
				count: 2,
				words: ["bar1", "bar2"]
			},
		]
		setGroups(groups.sort((a: GroupItem, b: GroupItem) => a.count > b.count ? 1 : -1))
	}
	
	
	useEffect(() => {
		if (groups.length === 0) {
			getGroupList()
		}
	})

	return (
		<div id="group-list" className="adminList">
			{groups.length > 0 && groups.map((group: GroupItem, i: number) => {
				const id = `group_${i}`

				return (
					<div id={id} key={id} className="item">
						<h3>{`${i+1} - ${group.mainWord}`}</h3>
						<div id={`${id}_words`} className="words">
							{group.words.map(word => {
								return <button key={word}>{word}</button>
							})}
						</div>
					</div>
				)	
			})}
		</div>
	)
}

export default AdminGroupList
