import { group } from "console"
import React, { useState, useEffect } from "react"
import "./groupList.css"

interface GroupItem {
	name: string,
	count: number,
	hidden: boolean
}

function GroupList() {
	const [groups, setGroups] = useState<GroupItem[]>([])

	const getGroupList = (previousGroups: GroupItem[] = []) => {
		fetch("http://localhost:7000/answers/allanswers")
		.then(response => response.json())
		.then(newGroups => {
			if (newGroups.length !== previousGroups.length || (previousGroups.length > 0 && newGroups.length > 0 && previousGroups[0].name !== newGroups[0].name)) {
				newGroups = newGroups.map((g: any) => Object.assign({}, g, { hidden: true }))
				newGroups.sort((a: GroupItem, b: GroupItem) => b.count - a.count)
				setGroups(newGroups)
			}
			setTimeout(() => getGroupList(newGroups), 5000)
		})
	}

	useEffect(() => getGroupList(), [])

	const show = (name: string) => {
		let newGroups: GroupItem[] = groups.map(group => {
			if (group.name === name) {
				group.hidden = false
			}
			return group
		})
		setGroups(newGroups)
	}

	const halfGroups: number[] = []
	    const halfLength: number = groups.length/2
	    groups.forEach((_, i) => {
	        if (i < halfLength) {
	            halfGroups.push(i)
	        }
	    })
	    return (
	        <table id="group-list" className="AnswerTable">
	            {halfGroups.map((_, i: number) => {
	                const firstGroupId = `group${i}`
	                const secondGroupId = `group${i+halfLength}`
	                const id = `${firstGroupId}_${secondGroupId}`

	                const firstGroup = groups[i]
	                const secondGroup = groups[i+halfLength]

	                return (
	                    <tr key={id}>
	                        <td className = "Cell">
														{firstGroup.hidden && <div onClick={() => show(firstGroup.name)} className = "AnswerCard"  id={firstGroupId}>{i+1}</div>}
														{!firstGroup.hidden && <div className = "Answer" id={firstGroupId}>{firstGroup.name}</div>}
	                        </td>
	                        <td className = "Cell">
														{secondGroup.hidden && <div onClick={() => show(secondGroup.name)} className = "AnswerCard"  id={secondGroupId}>{i+halfLength+1}</div>}
														{!secondGroup.hidden && <div className = "Answer" id={secondGroupId}>{secondGroup.name}</div>}
	                        </td>
	                    </tr>
	                )
	            })}
	        </table>
	    )
		}

export default GroupList
