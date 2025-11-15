import React from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
// {label:value}
const DetailView = ({setAlert,canOpenAlert=false,topButtons,title,contents,alertButtons}) => {
  return (
    <div>
    <AlertDialog open={canOpenAlert} onOpenChange={setAlert}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              <div className="flex flex-row justify-between">
              
                <div>{title}</div>
                <div className="gap-2 py-1 flex">
                  {topButtons.map(({id,element})=>(
                     <div key={id}>{element}</div>
                  ))}
                  </div>
              </div>
            </AlertDialogTitle>

            <AlertDialogDescription>
              <div className="mt-3 grid grid-cols-[140px_1fr] gap-y-3 gap-x-4 text-sm">

                {contents.map(({ label, value }, index) => (
                  <React.Fragment key={index}>
                    <span className="font-semibold text-gray-500">{label}:</span>
                    <span className="text-gray-800">{value}</span>
                  </React.Fragment>
                ))}

              </div>
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            {alertButtons.map((action) => (
                <AlertDialogAction key={action.id} onClick={action.onClick ? action.onClick : undefined} >
                  {action.link ? (
                    <Link to={action.link}>
                      {action.label}
                    </Link>
                  ) : (
                    action.label
                  )}
                </AlertDialogAction>
              ))}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DetailView
