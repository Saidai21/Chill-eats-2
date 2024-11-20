import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: 'tiendas',
    loadChildren: () => import('./tiendas/tiendas.module').then( m => m.TiendasPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cupones',
    loadChildren: () => import('./cupones/cupones.module').then( m => m.CuponesPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'comida-china',
    loadChildren: () => import('./comida-china/comida-china.module').then( m => m.ComidaChinaPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'hamburguesa',
    loadChildren: () => import('./hamburguesa/hamburguesa.module').then( m => m.HamburguesaPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'pizza',
    loadChildren: () => import('./pizza/pizza.module').then( m => m.PizzaPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cupon-1',
    loadChildren: () => import('./cupon-1/cupon-1.module').then( m => m.Cupon1PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cupon-2',
    loadChildren: () => import('./cupon-2/cupon-2.module').then( m => m.Cupon2PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cupon-3',
    loadChildren: () => import('./cupon-3/cupon-3.module').then( m => m.Cupon3PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cupon-4',
    loadChildren: () => import('./cupon-4/cupon-4.module').then( m => m.Cupon4PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule),
    canActivate:[authGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
