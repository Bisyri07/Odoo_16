/* @odoo-module */ 

import { registry } from '@web/core/registry';
import { kanbanView } from '@web/views/kanban/kanban_view';
import { KanbanController } from '@web/views/kanban/kanban_controller';
import { useService } from '@web/core/utils/hooks';

const { onWillStart } = owl;


class ResPartnerKanbanController extends KanbanController {
    setup(){
        super.setup()
        // console.log("This is res partner kanban controller")
        this.action = useService("action")
        this.orm = useService("orm")

        onWillStart(async ()=>{
            this.customerLocations = await this.orm.readGroup(
              //(model, domain, fields, groupby, kwargs = {})
                "res.partner", [], ['state_id'], ['state_id']
            )
            console.log(this.customerLocations)
        })
    }

    openSalesView(){
        // Open a default tree view
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Sales Order",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]],    
        })
    }

    openInvoicesView(){
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Invoices",
            res_model: "sale.order",
            domain: [["invoice_status", "=", "to invoice"]],
            views: [
                [false, "list"], [false, "form"], [false, "kanban"], 
                [false, "calendar"], [false, "pivot"]
            ],    
        })
    }

    openMeetingView(){
        this.action.doAction({
            name: "Meetings",
            type: "ir.actions.act_window",
            res_model: "calendar.event",
            views: [[false, "list"], [false, "calendar"]]
        })
    }

    selectLocations(state){
        const id = state[0]
        const name = state[1]

        // console.log("id", id)
        // console.log("location name", name)
        
        this.env.searchModel.setDomainParts({
            state: {
                domain: [['state_id', '=', id]],
                facetLabel: name,
            }
        })
    }

};


export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "owl.ResPartnerKanbanView.Button",
};

ResPartnerKanbanController.template = "owl.ResPartnerKanbanView";

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView);
