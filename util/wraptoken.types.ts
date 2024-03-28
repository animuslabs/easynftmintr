import type {
    Action,
    BytesType,
    Checksum256Type,
    Int32Type,
    NameType,
    PublicKeyType,
    SignatureType,
    UInt16Type,
    UInt32Type,
    UInt64Type,
    VarUIntType,
} from '@wharfkit/antelope'
import {
    ABI,
    Asset,
    Blob,
    BlockTimestamp,
    Bytes,
    Checksum256,
    Int32,
    Name,
    PublicKey,
    Signature,
    Struct,
    UInt16,
    UInt32,
    UInt64,
    VarUInt,
} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yACIGYWN0aW9uAAQHYWNjb3VudARuYW1lBG5hbWUEbmFtZQ1hdXRob3JpemF0aW9uEnBlcm1pc3Npb25fbGV2ZWxbXQRkYXRhBWJ5dGVzC2FjdGlvbnByb29mAAQGYWN0aW9uBmFjdGlvbgdyZWNlaXB0CmFjdHJlY2VpcHQLcmV0dXJudmFsdWUFYnl0ZXMLYW1wcm9vZnBhdGgNY2hlY2tzdW0yNTZbXQphY3RyZWNlaXB0AAcIcmVjZWl2ZXIEbmFtZQphY3RfZGlnZXN0C2NoZWNrc3VtMjU2D2dsb2JhbF9zZXF1ZW5jZQZ1aW50NjQNcmVjdl9zZXF1ZW5jZQZ1aW50NjQNYXV0aF9zZXF1ZW5jZQlhdXRoc2VxW10NY29kZV9zZXF1ZW5jZQl2YXJ1aW50MzIMYWJpX3NlcXVlbmNlCXZhcnVpbnQzMgthbmNob3JibG9jawADBWJsb2NrDHNibG9ja2hlYWRlcgxhY3RpdmVfbm9kZXMIdWludDE2W10Kbm9kZV9jb3VudAZ1aW50NjQIYXNzZXRzX3MACAhhc3NldF9pZAZ1aW50NjQPY29sbGVjdGlvbl9uYW1lBG5hbWULc2NoZW1hX25hbWUEbmFtZQt0ZW1wbGF0ZV9pZAVpbnQzMglyYW1fcGF5ZXIEbmFtZQ1iYWNrZWRfdG9rZW5zB2Fzc2V0W10ZaW1tdXRhYmxlX3NlcmlhbGl6ZWRfZGF0YQVieXRlcxdtdXRhYmxlX3NlcmlhbGl6ZWRfZGF0YQVieXRlcwdhdXRoc2VxAAIHYWNjb3VudARuYW1lCHNlcXVlbmNlBnVpbnQ2NAtibG9ja2hlYWRlcgAJCXRpbWVzdGFtcBRibG9ja190aW1lc3RhbXBfdHlwZQhwcm9kdWNlcgRuYW1lCWNvbmZpcm1lZAZ1aW50MTYIcHJldmlvdXMLY2hlY2tzdW0yNTYRdHJhbnNhY3Rpb25fbXJvb3QLY2hlY2tzdW0yNTYMYWN0aW9uX21yb290C2NoZWNrc3VtMjU2EHNjaGVkdWxlX3ZlcnNpb24GdWludDMyDW5ld19wcm9kdWNlcnMScHJvZHVjZXJfc2NoZWR1bGU/EWhlYWRlcl9leHRlbnNpb25zE3BhaXJfdWludDE2X2J5dGVzW10HY2FuY2VsYQADBnByb3ZlcgRuYW1lCmJsb2NrcHJvb2YKaGVhdnlwcm9vZgthY3Rpb25wcm9vZgthY3Rpb25wcm9vZgdjYW5jZWxiAAMGcHJvdmVyBG5hbWUKYmxvY2twcm9vZgpsaWdodHByb29mC2FjdGlvbnByb29mC2FjdGlvbnByb29mB2Rpc2FibGUAAAZlbmFibGUAAAlmYWtlaXNzdWUAAQZhY3Rpb24GYWN0aW9uBmdsb2JhbAAGCGNoYWluX2lkC2NoZWNrc3VtMjU2D2JyaWRnZV9jb250cmFjdARuYW1lD3BhaXJlZF9jaGFpbl9pZAtjaGVja3N1bTI1NhhwYWlyZWRfd3JhcGxvY2tfY29udHJhY3QEbmFtZRVwYWlyZWRfdG9rZW5fY29udHJhY3QEbmFtZQdlbmFibGVkBGJvb2wKaGVhdnlwcm9vZgAECGNoYWluX2lkC2NoZWNrc3VtMjU2Bmhhc2hlcw1jaGVja3N1bTI1NltdDGJsb2NrdG9wcm92ZQthbmNob3JibG9jawhiZnRwcm9vZg5zYmxvY2toZWFkZXJbXQhocHN0cnVjdAACAmlkBnVpbnQ2NAJocApoZWF2eXByb29mBGluaXQABAhjaGFpbl9pZAtjaGVja3N1bTI1Ng9icmlkZ2VfY29udHJhY3QEbmFtZQ9wYWlyZWRfY2hhaW5faWQLY2hlY2tzdW0yNTYYcGFpcmVkX3dyYXBsb2NrX2NvbnRyYWN0BG5hbWUGaXNzdWVhAAMGcHJvdmVyBG5hbWUKYmxvY2twcm9vZgpoZWF2eXByb29mC2FjdGlvbnByb29mC2FjdGlvbnByb29mBmlzc3VlYgADBnByb3ZlcgRuYW1lCmJsb2NrcHJvb2YKbGlnaHRwcm9vZgthY3Rpb25wcm9vZgthY3Rpb25wcm9vZgpsaWdodHByb29mAAQIY2hhaW5faWQLY2hlY2tzdW0yNTYGaGVhZGVyC2Jsb2NraGVhZGVyBHJvb3QLY2hlY2tzdW0yNTYLYm1wcm9vZnBhdGgNY2hlY2tzdW0yNTZbXQhscHN0cnVjdAACAmlkBnVpbnQ2NAJscApsaWdodHByb29mCW1ldGFtYXBybQABF2ZvcmVpZ25fY29sbGVjdGlvbl9uYW1lBG5hbWUKbWV0YW1hcHNldAABCW1hcF9lbnRyeQpuZnRtZXRhbWFwCG5mdGlkbWFwAAIObG9jYWxfYXNzZXRfaWQGdWludDY0EGZvcmVpZ25fYXNzZXRfaWQGdWludDY0CW5mdGlkeGZlcgABCW5mdGlkeGZlcgtuZnRpZHhmZXJfcwtuZnRpZHhmZXJfcwADCWFzc2V0X2lkcwh1aW50NjRbXQtiZW5lZmljaWFyeQRuYW1lBG1lbW8Gc3RyaW5nCm5mdG1ldGFtYXAABBdmb3JlaWduX2NvbGxlY3Rpb25fbmFtZQRuYW1lFWxvY2FsX2NvbGxlY3Rpb25fbmFtZQRuYW1lFGZvcmVpZ25fdGVtcGxhdGVfaWRzB2ludDMyW10SbG9jYWxfdGVtcGxhdGVfaWRzB2ludDMyW10HbmZ0eGZlcgAEBW93bmVyBG5hbWUGYXNzZXRzCmFzc2V0c19zW10LYmVuZWZpY2lhcnkEbmFtZQRtZW1vBnN0cmluZxFwYWlyX3VpbnQxNl9ieXRlcwACBWZpcnN0BnVpbnQxNgZzZWNvbmQFYnl0ZXMQcGVybWlzc2lvbl9sZXZlbAACBWFjdG9yBG5hbWUKcGVybWlzc2lvbgRuYW1lCXByb2Nlc3NlZAACAmlkBnVpbnQ2NA5yZWNlaXB0X2RpZ2VzdAtjaGVja3N1bTI1Ngxwcm9kdWNlcl9rZXkAAg1wcm9kdWNlcl9uYW1lBG5hbWURYmxvY2tfc2lnbmluZ19rZXkKcHVibGljX2tleRFwcm9kdWNlcl9zY2hlZHVsZQACB3ZlcnNpb24GdWludDMyCXByb2R1Y2Vycw5wcm9kdWNlcl9rZXlbXQxzYmxvY2toZWFkZXIABAZoZWFkZXILYmxvY2toZWFkZXITcHJvZHVjZXJfc2lnbmF0dXJlcwtzaWduYXR1cmVbXQ9wcmV2aW91c19ibXJvb3QLY2hlY2tzdW0yNTYLYm1wcm9vZnBhdGgIdWludDE2W10JdGVtcG5mdGlkAAMQZm9yZWlnbl9hc3NldF9pZAZ1aW50NjQKYmVuZmljaWFyeQRuYW1lBG1lbW8Gc3RyaW5nCwAAAMBEhaZBB2NhbmNlbGEAAAAA4ESFpkEHY2FuY2VsYgAAAABAxWOwSwdkaXNhYmxlAAAAAACoeMxUBmVuYWJsZQAAAFAaY6egWQlmYWtlaXNzdWUAAAAAAACQ3XQEaW5pdAAAAAAAGKUxdgZpc3N1ZWEAAAAAABylMXYGaXNzdWViAAAAkLcaabKSCW1ldGFtYXBybQAAQFa4GmmykgptZXRhbWFwc2V0AAAAuGr15PKaCW5mdGlkeGZlcgAJAAAAAERzaGQDaTY0AAAGZ2xvYmFsAMCi9Fa/jWoDaTY0AAAIaHBzdHJ1Y3QAwKL01tyYiwNpNjQAAAhscHN0cnVjdAAAANXI5PKaA2k2NAAACG5mdGlkbWFwADC4avXk8poDaTY0AAALbmZ0aWR4ZmVyX3MAQDXSZCXzmgNpNjQAAApuZnRtZXRhbWFwAAAA4KrV85oDaTY0AAAHbmZ0eGZlcgAASApjheitA2k2NAAACXByb2Nlc3NlZAAASC6vWaXKA2k2NAAACXRlbXBuZnRpZAAAAAAA'
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('permission_level')
    export class permission_level extends Struct {
        @Struct.field(Name)
        actor!: Name
        @Struct.field(Name)
        permission!: Name
    }
    @Struct.type('action')
    export class action extends Struct {
        @Struct.field(Name)
        account!: Name
        @Struct.field(Name)
        name!: Name
        @Struct.field(permission_level, {array: true})
        authorization!: permission_level[]
        @Struct.field(Bytes)
        data!: Bytes
    }
    @Struct.type('authseq')
    export class authseq extends Struct {
        @Struct.field(Name)
        account!: Name
        @Struct.field(UInt64)
        sequence!: UInt64
    }
    @Struct.type('actreceipt')
    export class actreceipt extends Struct {
        @Struct.field(Name)
        receiver!: Name
        @Struct.field(Checksum256)
        act_digest!: Checksum256
        @Struct.field(UInt64)
        global_sequence!: UInt64
        @Struct.field(UInt64)
        recv_sequence!: UInt64
        @Struct.field(authseq, {array: true})
        auth_sequence!: authseq[]
        @Struct.field(VarUInt)
        code_sequence!: VarUInt
        @Struct.field(VarUInt)
        abi_sequence!: VarUInt
    }
    @Struct.type('actionproof')
    export class actionproof extends Struct {
        @Struct.field(action)
        action!: action
        @Struct.field(actreceipt)
        receipt!: actreceipt
        @Struct.field(Bytes)
        returnvalue!: Bytes
        @Struct.field(Checksum256, {array: true})
        amproofpath!: Checksum256[]
    }
    @Struct.type('producer_key')
    export class producer_key extends Struct {
        @Struct.field(Name)
        producer_name!: Name
        @Struct.field(PublicKey)
        block_signing_key!: PublicKey
    }
    @Struct.type('producer_schedule')
    export class producer_schedule extends Struct {
        @Struct.field(UInt32)
        version!: UInt32
        @Struct.field(producer_key, {array: true})
        producers!: producer_key[]
    }
    @Struct.type('pair_uint16_bytes')
    export class pair_uint16_bytes extends Struct {
        @Struct.field(UInt16)
        first!: UInt16
        @Struct.field(Bytes)
        second!: Bytes
    }
    @Struct.type('blockheader')
    export class blockheader extends Struct {
        @Struct.field(BlockTimestamp)
        timestamp!: BlockTimestamp
        @Struct.field(Name)
        producer!: Name
        @Struct.field(UInt16)
        confirmed!: UInt16
        @Struct.field(Checksum256)
        previous!: Checksum256
        @Struct.field(Checksum256)
        transaction_mroot!: Checksum256
        @Struct.field(Checksum256)
        action_mroot!: Checksum256
        @Struct.field(UInt32)
        schedule_version!: UInt32
        @Struct.field(producer_schedule, {optional: true})
        new_producers?: producer_schedule
        @Struct.field(pair_uint16_bytes, {array: true})
        header_extensions!: pair_uint16_bytes[]
    }
    @Struct.type('sblockheader')
    export class sblockheader extends Struct {
        @Struct.field(blockheader)
        header!: blockheader
        @Struct.field(Signature, {array: true})
        producer_signatures!: Signature[]
        @Struct.field(Checksum256)
        previous_bmroot!: Checksum256
        @Struct.field(UInt16, {array: true})
        bmproofpath!: UInt16[]
    }
    @Struct.type('anchorblock')
    export class anchorblock extends Struct {
        @Struct.field(sblockheader)
        block!: sblockheader
        @Struct.field(UInt16, {array: true})
        active_nodes!: UInt16[]
        @Struct.field(UInt64)
        node_count!: UInt64
    }
    @Struct.type('assets_s')
    export class assets_s extends Struct {
        @Struct.field(UInt64)
        asset_id!: UInt64
        @Struct.field(Name)
        collection_name!: Name
        @Struct.field(Name)
        schema_name!: Name
        @Struct.field(Int32)
        template_id!: Int32
        @Struct.field(Name)
        ram_payer!: Name
        @Struct.field(Asset, {array: true})
        backed_tokens!: Asset[]
        @Struct.field(Bytes)
        immutable_serialized_data!: Bytes
        @Struct.field(Bytes)
        mutable_serialized_data!: Bytes
    }
    @Struct.type('heavyproof')
    export class heavyproof extends Struct {
        @Struct.field(Checksum256)
        chain_id!: Checksum256
        @Struct.field(Checksum256, {array: true})
        hashes!: Checksum256[]
        @Struct.field(anchorblock)
        blocktoprove!: anchorblock
        @Struct.field(sblockheader, {array: true})
        bftproof!: sblockheader[]
    }
    @Struct.type('cancela')
    export class cancela extends Struct {
        @Struct.field(Name)
        prover!: Name
        @Struct.field(heavyproof)
        blockproof!: heavyproof
        @Struct.field(actionproof)
        actionproof!: actionproof
    }
    @Struct.type('lightproof')
    export class lightproof extends Struct {
        @Struct.field(Checksum256)
        chain_id!: Checksum256
        @Struct.field(blockheader)
        header!: blockheader
        @Struct.field(Checksum256)
        root!: Checksum256
        @Struct.field(Checksum256, {array: true})
        bmproofpath!: Checksum256[]
    }
    @Struct.type('cancelb')
    export class cancelb extends Struct {
        @Struct.field(Name)
        prover!: Name
        @Struct.field(lightproof)
        blockproof!: lightproof
        @Struct.field(actionproof)
        actionproof!: actionproof
    }
    @Struct.type('disable')
    export class disable extends Struct {}
    @Struct.type('enable')
    export class enable extends Struct {}
    @Struct.type('fakeissue')
    export class fakeissue extends Struct {
        @Struct.field(action)
        action!: action
    }
    @Struct.type('global')
    export class global extends Struct {
        @Struct.field(Checksum256)
        chain_id!: Checksum256
        @Struct.field(Name)
        bridge_contract!: Name
        @Struct.field(Checksum256)
        paired_chain_id!: Checksum256
        @Struct.field(Name)
        paired_wraplock_contract!: Name
        @Struct.field(Name)
        paired_token_contract!: Name
        @Struct.field('bool')
        enabled!: boolean
    }
    @Struct.type('hpstruct')
    export class hpstruct extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(heavyproof)
        hp!: heavyproof
    }
    @Struct.type('init')
    export class init extends Struct {
        @Struct.field(Checksum256)
        chain_id!: Checksum256
        @Struct.field(Name)
        bridge_contract!: Name
        @Struct.field(Checksum256)
        paired_chain_id!: Checksum256
        @Struct.field(Name)
        paired_wraplock_contract!: Name
    }
    @Struct.type('issuea')
    export class issuea extends Struct {
        @Struct.field(Name)
        prover!: Name
        @Struct.field(heavyproof)
        blockproof!: heavyproof
        @Struct.field(actionproof)
        actionproof!: actionproof
    }
    @Struct.type('issueb')
    export class issueb extends Struct {
        @Struct.field(Name)
        prover!: Name
        @Struct.field(lightproof)
        blockproof!: lightproof
        @Struct.field(actionproof)
        actionproof!: actionproof
    }
    @Struct.type('lpstruct')
    export class lpstruct extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(lightproof)
        lp!: lightproof
    }
    @Struct.type('metamaprm')
    export class metamaprm extends Struct {
        @Struct.field(Name)
        foreign_collection_name!: Name
    }
    @Struct.type('nftmetamap')
    export class nftmetamap extends Struct {
        @Struct.field(Name)
        foreign_collection_name!: Name
        @Struct.field(Name)
        local_collection_name!: Name
        @Struct.field(Int32, {array: true})
        foreign_template_ids!: Int32[]
        @Struct.field(Int32, {array: true})
        local_template_ids!: Int32[]
    }
    @Struct.type('metamapset')
    export class metamapset extends Struct {
        @Struct.field(nftmetamap)
        map_entry!: nftmetamap
    }
    @Struct.type('nftidmap')
    export class nftidmap extends Struct {
        @Struct.field(UInt64)
        local_asset_id!: UInt64
        @Struct.field(UInt64)
        foreign_asset_id!: UInt64
    }
    @Struct.type('nftidxfer_s')
    export class nftidxfer_s extends Struct {
        @Struct.field(UInt64, {array: true})
        asset_ids!: UInt64[]
        @Struct.field(Name)
        beneficiary!: Name
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('nftidxfer')
    export class nftidxfer extends Struct {
        @Struct.field(nftidxfer_s)
        nftidxfer!: nftidxfer_s
    }
    @Struct.type('nftxfer')
    export class nftxfer extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(assets_s, {array: true})
        assets!: assets_s[]
        @Struct.field(Name)
        beneficiary!: Name
        @Struct.field('string')
        memo!: string
    }
    @Struct.type('processed')
    export class processed extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(Checksum256)
        receipt_digest!: Checksum256
    }
    @Struct.type('tempnftid')
    export class tempnftid extends Struct {
        @Struct.field(UInt64)
        foreign_asset_id!: UInt64
        @Struct.field(Name)
        benficiary!: Name
        @Struct.field('string')
        memo!: string
    }
}
export const TableMap = {
    global: Types.global,
    heavyproof: Types.hpstruct,
    lightproof: Types.lpstruct,
    nftidmap: Types.nftidmap,
    nftidxfer_s: Types.nftidxfer_s,
    nftmetamap: Types.nftmetamap,
    nftxfer: Types.nftxfer,
    processed: Types.processed,
    tempnftid: Types.tempnftid,
}
export interface TableTypes {
    global: Types.global
    heavyproof: Types.hpstruct
    lightproof: Types.lpstruct
    nftidmap: Types.nftidmap
    nftidxfer_s: Types.nftidxfer_s
    nftmetamap: Types.nftmetamap
    nftxfer: Types.nftxfer
    processed: Types.processed
    tempnftid: Types.tempnftid
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {
        export interface heavyproof {
            chain_id: Checksum256Type
            hashes: Checksum256Type[]
            blocktoprove: Type.anchorblock
            bftproof: Type.sblockheader[]
        }
        export interface anchorblock {
            block: Type.sblockheader
            active_nodes: UInt16Type[]
            node_count: UInt64Type
        }
        export interface sblockheader {
            header: Type.blockheader
            producer_signatures: SignatureType[]
            previous_bmroot: Checksum256Type
            bmproofpath: UInt16Type[]
        }
        export interface blockheader {
            timestamp: BlockTimestamp
            producer: NameType
            confirmed: UInt16Type
            previous: Checksum256Type
            transaction_mroot: Checksum256Type
            action_mroot: Checksum256Type
            schedule_version: UInt32Type
            new_producers: Type.producer_schedule
            header_extensions: Type.pair_uint16_bytes[]
        }
        export interface producer_schedule {
            version: UInt32Type
            producers: Type.producer_key[]
        }
        export interface producer_key {
            producer_name: NameType
            block_signing_key: PublicKeyType
        }
        export interface pair_uint16_bytes {
            first: UInt16Type
            second: BytesType
        }
        export interface actionproof {
            action: Type.action
            receipt: Type.actreceipt
            returnvalue: BytesType
            amproofpath: Checksum256Type[]
        }
        export interface action {
            account: NameType
            name: NameType
            authorization: Type.permission_level[]
            data: BytesType
        }
        export interface permission_level {
            actor: NameType
            permission: NameType
        }
        export interface actreceipt {
            receiver: NameType
            act_digest: Checksum256Type
            global_sequence: UInt64Type
            recv_sequence: UInt64Type
            auth_sequence: Type.authseq[]
            code_sequence: VarUIntType
            abi_sequence: VarUIntType
        }
        export interface authseq {
            account: NameType
            sequence: UInt64Type
        }
        export interface lightproof {
            chain_id: Checksum256Type
            header: Type.blockheader
            root: Checksum256Type
            bmproofpath: Checksum256Type[]
        }
        export interface nftmetamap {
            foreign_collection_name: NameType
            local_collection_name: NameType
            foreign_template_ids: Int32Type[]
            local_template_ids: Int32Type[]
        }
        export interface nftidxfer_s {
            asset_ids: UInt64Type[]
            beneficiary: NameType
            memo: string
        }
    }
    export interface cancela {
        prover: NameType
        blockproof: Type.heavyproof
        actionproof: Type.actionproof
    }
    export interface cancelb {
        prover: NameType
        blockproof: Type.lightproof
        actionproof: Type.actionproof
    }
    export interface disable {}
    export interface enable {}
    export interface fakeissue {
        action: Type.action
    }
    export interface init {
        chain_id: Checksum256Type
        bridge_contract: NameType
        paired_chain_id: Checksum256Type
        paired_wraplock_contract: NameType
    }
    export interface issuea {
        prover: NameType
        blockproof: Type.heavyproof
        actionproof: Type.actionproof
    }
    export interface issueb {
        prover: NameType
        blockproof: Type.lightproof
        actionproof: Type.actionproof
    }
    export interface metamaprm {
        foreign_collection_name: NameType
    }
    export interface metamapset {
        map_entry: Type.nftmetamap
    }
    export interface nftidxfer {
        nftidxfer: Type.nftidxfer_s
    }
}
export interface ActionNameParams {
    cancela: ActionParams.cancela
    cancelb: ActionParams.cancelb
    disable: ActionParams.disable
    enable: ActionParams.enable
    fakeissue: ActionParams.fakeissue
    init: ActionParams.init
    issuea: ActionParams.issuea
    issueb: ActionParams.issueb
    metamaprm: ActionParams.metamaprm
    metamapset: ActionParams.metamapset
    nftidxfer: ActionParams.nftidxfer
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('unknown'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    table<T extends TableNames>(name: T, scope?: NameType): Table<RowType<T>> {
        return super.table(name, scope, TableMap[name])
    }
}
