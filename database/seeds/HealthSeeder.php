<?php

use App\Health;
use Illuminate\Database\Seeder;

class HealthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $healths = [
            [
                'name'=>'excellence',
                'description'=>'This road is in a very good shape',
                'rank'=>'70',
                'cap'=>'30',
                'color'=>'success'
            ],
            [
                'name'=>'good',
                'description'=>'This road is in a very good shape',
                'rank'=>'60',
                'cap'=>'40',
                'color'=>'info'
            ],
            [
                'name'=>'bad',
                'description'=>'This road is in a very good shape',
                'rank'=>'50',
                'cap'=>'50',
                'color'=>'warning'
            ],
            [
                'name'=>'critical',
                'description'=>'This road is in a very good shape',
                'rank'=>'45',
                'cap'=>'55',
                'color'=>'danger'
            ]
        ];

        foreach($healths as $health){
            Health::create($health);
        }
    }
}
