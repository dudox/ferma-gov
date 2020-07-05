<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DamageStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('damage_statuses')->insert([
            [
                'name' => 'URR',
                'description' => 'Damage Entry yet to be processed',
                'color_code' => 'primary',
                'cap'=>0,
                'icon' => 'fa fa-circle',
            ],
            [
                'name' => 'In Progress',
                'description' => 'Damage Entry is been processed and repair is ongoing',
                'color_code' => 'info',
                'cap'=>0,
                'icon' => 'fa fa-spaceship',
            ],
            [
                'name' => 'Completed',
                'description' => 'Damage Entry has been processed successfully',
                'color_code' => 'success',
                'cap'=>0,
                'icon' => 'fa fa-check-2',
            ],
            [
                'name' => 'Bad Health',
                'description' => 'Damage Entry has been processed successfully',
                'color_code' => 'warning',
                'cap'=>0,
                'icon' => 'fa fa-check-2',
            ],
            [
                'name' => 'Critical Health',
                'description' => 'Damage Entry has been processed successfully',
                'color_code' => 'danger',
                'cap'=>0,
                'icon' => 'fa fa-check-2',
            ],
            // [
            //     'name' => 'Failed',
            //     'description' => 'Damage Entry was not processed successfully',
            //     'color_code' => 'text-danger',
            //     'icon' => 'nc nc-simple-remove',
            // ],
        ]);
    }
}
