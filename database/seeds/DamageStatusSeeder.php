<?php

use App\DamageStatus;
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
        $statuses = [
            [
                'name' => 'Pending',
                'description' => 'Damage Entry yet to be processed',
                'color_code' => 'primary',
                'icon' => 'fa fa-circle',
            ],
            [
                'name' => 'In Progress',
                'description' => 'Damage Entry is been processed and repair is ongoing',
                'color_code' => 'info',
                'icon' => 'fa fa-spaceship',
            ],
            [
                'name' => 'Fixed',
                'description' => 'Damage Entry has been processed successfully',
                'color_code' => 'success',
                'icon' => 'fa fa-check-2',
            ],
            // [
            //     'name' => 'Failed',
            //     'description' => 'Damage Entry was not processed successfully',
            //     'color_code' => 'text-danger',
            //     'icon' => 'nc nc-simple-remove',
            // ],
        ];

        foreach($statuses as $status){
            DamageStatus::create($status);
        }
    }
}
