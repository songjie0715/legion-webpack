<template>
    <div>
        <div class="card-block">
            Sub Route 2 with Async
        </div>
        <div class="card-block">
            <table class="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td class="actions">
                        <a href="#"><i class="fa fa-cog"></i></a>
                        <a href="#"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td class="actions">
                        <a href="#"><i class="fa fa-cog"></i></a>
                        <a href="#"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td class="actions">
                        <a href="#"><i class="fa fa-cog"></i></a>
                        <a href="#"><i class="fa fa-remove"></i></a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SubRoute2View'
    }
</script>