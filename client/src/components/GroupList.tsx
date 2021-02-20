import { group } from "console"
import React, { useState, useEffect } from "react"
import "./groupList.css"

interface GroupItem {
	id: string,
	mainWord: string,
	count: number,
	hidden: boolean
}

function GroupList() {
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
				hidden: true
			},
			{
				id: "abc2",
				mainWord: "game",
				count: 4,
				hidden: true
			},
			{
				id: "abc3",
				mainWord: "steam",
				count: 6,
				hidden: true
			},
			{
				id: "abc4",
				mainWord: "foo",
				count: 8,
				hidden: true
			},
			{
				id: "abc5",
				mainWord: "cactus",
				count: 1,
				hidden: true
			},
			{
				id: "abc6",
				mainWord: "bar",
				count: 2,
				hidden: true
			},
		]
		setGroups(groups.sort((a: GroupItem, b: GroupItem) => a.count > b.count ? 1 : -1))
	}
	
	
	useEffect(() => {
		if (groups.length === 0) {
			getGroupList()
		}
	})

	const show = (id: string) => {
		let newGroups: GroupItem[] = groups.map(group => {
			if (group.id === id) {
				group.hidden = false
			}
			return group
		})
		setGroups(newGroups)
	}

	return (
		<div id="group-list" className="list">
			{groups.length > 0 && groups.map((group: GroupItem, i: number) => {
				const id = `group_${i}`

				return (
					<div id={id} key={id} className="item">
						<h1>{i+1}</h1>
						<button onClick={() => show(group.id)}>{group.hidden ? "?" : group.mainWord}</button>
					</div>
				)	
			})}
		</div>
	)
}

export default GroupList
