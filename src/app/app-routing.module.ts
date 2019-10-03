import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './views/ships/starships.component';
import { MonstersComponent } from './views/monsters/monsters.component';
import { MenuComponent } from './views/menu/menu.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
    },
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full' 
    },
    {
        path: 'ships',
        component: StarshipsComponent
    },
    {
        path: 'monsters',
        component: MonstersComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }